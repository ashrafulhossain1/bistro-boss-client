import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';


const MenuCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()

    const [, refetch] = useCart()

    const handleAddToCart = () => {
        if (user && user.email) {
            //  send cart item to the database

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} to Your Cart`,
                            showConfirmButton: false,
                            timer: 5000
                        });
                        // refetch the cart for update the items count
                        refetch()
                    }
                })
            
        }
        else {
            Swal.fire({
                title: "You are not Logged in?",
                text: "please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // SEND: the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }


    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className='absolute right-0 mr-4 mt-4 p-2 rounded-md bg-black/75 text-white'>${price}</p>
            <div className="card-body p-4">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button
                        onClick={handleAddToCart}
                        className="btn btn-outline  border-0 border-b-4 mt-4 bg-slate-200 border-orange-500 hover:border-orange-500">
                        Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;