import React from 'react';

const MenuCard = ({ item }) => {
    const { name, image, price, recipe } = item;
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
                    <button className="btn btn-outline  border-0 border-b-4 mt-4 bg-slate-200 border-orange-500 hover:border-orange-500">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;