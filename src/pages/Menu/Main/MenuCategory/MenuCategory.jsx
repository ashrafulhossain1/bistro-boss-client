import React from 'react';
import MenuItem from '../../../Shared/MenuItem/MenuItem';
import Cover from '../../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img }) => {
    // console.log(title)

    return (
        <div className='p-8'>
            {title && <Cover img={img} title={title}></Cover>}

            <div className="grid md:grid-cols-2 gap-10 mt-16">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            {
                title &&
                <div className='flex justify-center'>
                    <Link to={`/order/${title}`}>
                        <button className="btn btn-outline border-0 border-b-4 mt-4">{title} Order Now</button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default MenuCategory;