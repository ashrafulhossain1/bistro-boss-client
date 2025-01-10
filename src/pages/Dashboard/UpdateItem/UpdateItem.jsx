import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import userAxiosPublic from '../../../hooks/userAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const image_hosing_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosing_key}`;
const UpdateItem = () => {
    const { _id, name, category, recipe, price } = useLoaderData()

    const { register, handleSubmit, reset } = useForm()

    const axiosPublic = userAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }

        // POST request in API's
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })

        if (res.data.success) {
            // now send the menu item in database=> where as image url I get
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // adter image upload in database, and get img link, so..
            // sent new menuItem in database
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data)
            if (menuRes.data.modifiedCount > 0) {
                // show success popUp
                // reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };


    return (
        <div>
            <SectionTitle heading='update Item' subHeading='Refresh info' ></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe name</span>
                        </label>
                        <input
                            defaultValue={name}
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Recipe name" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full ">
                            <label className="label">
                                Category*
                            </label>
                            <select
                                defaultValue={category}
                                {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value='default'>Select a Category?</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        {/* price  */}
                        <div className="form-control w-full">
                            <label className="label">
                                Price
                            </label>
                            <input
                                defaultValue={price}
                                {...register('price', { required: true })}
                                type="number" placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* recipe details */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea
                            defaultValue={recipe}
                            {...register('recipe')}
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </label>
                    <div className="form-control w-full">
                        <input
                            {...register('image', { required: true })}
                            type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button
                        className="btn bg-gradient-to-tr w-full from-orange-400 to-indigo-500">

                        Update Menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;