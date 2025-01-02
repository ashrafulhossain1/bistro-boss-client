import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuBg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';
// import PopularMenu from '../../Home/PopularMenu/PopularMenu';

const Menu = () => {

    const [menu] = useMenu()
    
    const desserts = menu.filter(item=> item.category === 'dessert');
    const soup = menu.filter(item=> item.category === 'soup');
    const offer = menu.filter(item=> item.category === 'offered');
    const salad = menu.filter(item=> item.category === 'salad');
    const pizza = menu.filter(item=> item.category === 'pizza');



    return (
        <div>
            <Helmet>
                <title>
                    Bistro Boss Menu
                </title>
            </Helmet>
            <Cover img={menuBg} title={'our menu'}></Cover>
            {/* <PopularMenu></PopularMenu> */}
            {/* main cover */}
            <SectionTitle heading={"Todays Offters"} subHeading={"Don't Miss"}></SectionTitle>
            {/* offers menu items */}
            <MenuCategory items={offer}></MenuCategory>
            
            {/* dessert menu items */}
            <MenuCategory items={desserts} title={'dessert'} img={dessertImg}
            ></MenuCategory>
            <MenuCategory items={pizza} title={'Pizza'} img={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} title={'salad'} img={saladImg}></MenuCategory>
            <MenuCategory items={soup} title={'soup'} img={soupImg}></MenuCategory>
            
        </div>
    );
};

export default Menu;