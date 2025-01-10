

// import { FaTrashAlt } from "react-icons/fa";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import useCart from "../../../hooks/useCart";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const axiosSecure = useAxiosSecure()

    const handleDeleteCart = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/cart/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });
    }

    return (
        <div className="bg-white p-6 rounded-lg">
            <SectionTitle
                heading={'Wanna Add more'}
                subHeading={'my cart'}
            ></SectionTitle>
            <div className="flex justify-between">
                <h2 className="text-3xl">Items: {cart.length}</h2>
                <h2 className="text-3xl">Total Price: {totalPrice}</h2>
                {cart.length ? <Link to='/dashboard/payment'>
                    <button className="btn btn-primary">Pay</button>
                </Link> :
                    <button disabled={true} className="btn btn-primary">Pay</button>

                }
            </div>
            <div className="overflow-x-auto ">
                <table className="table w-full my-10">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart.map((item, inx) => (
                                <tr key={item._id}>
                                    <th>
                                        {inx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>$ {item.price}</td>
                                    <th>
                                        <button onClick={() => handleDeleteCart(item._id)} className="btn btn-ghost p-4 btn-xs">

                                            <FaTrashAlt className="text-red-500 text-xl"></FaTrashAlt>
                                        </button>
                                    </th>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;