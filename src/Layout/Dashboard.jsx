import { FaAd, FaHome, FaSearch } from "react-icons/fa";
import { FaCalendar, FaCartShopping, FaJediOrder, FaList } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import './DashboardLinks.css'
import useCart from "../hooks/useCart";

const Dashboard = () => {

    const [cart] = useCart()


    return (
        <div className="flex ">
            {/*  */}
            <div className="w-80 min-h-screen bg-orange-300">
                <ul className="menu p-4">
                    <li>
                        <NavLink to='/dashboard/userHome'>
                            <FaHome></FaHome>
                            User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/cart'>
                            <span className="absolute top-[3px] left-6 text-[8px]">{cart.length}</span>
                            <FaCartShopping></FaCartShopping>
                            My Cart </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/reservation'>
                            <FaCalendar></FaCalendar>
                            Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/review'>
                            <MdRateReview />
                            Reviews</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/bookings'>
                            <FaList></FaList>
                            My Bookings
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                            <FaSearch></FaSearch>
                            menu
                        </NavLink>
                    </li>
                </ul>

            </div>
            <div className="flex-1 p-8 bg-slate-100">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;