import { FaHome, FaSearch } from "react-icons/fa";
import { FaBook, FaCalendar, FaCartShopping, FaEnvelope, FaList, FaUsers, FaUtensils } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import './DashboardLinks.css'
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart()

  // TODO: get isAdmin value in the database 
  const [isAdmin] = useAdmin()


  return (
    <div className="flex ">
      <div className="w-80 min-h-screen bg-orange-300">
        <ul className="menu p-4">
          {
            isAdmin ?
              <>
              {/* for ADMIN */}

                <li>
                  <NavLink to='/dashboard/adminHome'>
                    <FaHome></FaHome>
                    Admin Home</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/addItems'>
                    <span className="absolute top-[3px] left-6 text-[8px]">{cart.length}</span>
                    <FaUtensils></FaUtensils>
                    Add Items</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/manageItems'>
                    <FaList></FaList>
                    Manage Items</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/bookings'>
                    <FaBook></FaBook>
                    Manage Bookings</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/users'>
                    <FaUsers></FaUsers>
                    All Users
                  </NavLink>
                </li>

              </> :
              
              <>
              {/* for USER */}
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
                  <NavLink to='/dashboard/history'>
                    <FaCalendar></FaCalendar>
                    History</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/review'>
                    <MdRateReview />
                    Reviews</NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/paymentHistory'>
                    <FaList></FaList>
                    Payment History
                  </NavLink>
                </li>
              </>
          }
          {/* --------------------------common  below divider------------------------------- */}
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
          <li>
            <NavLink to='/contact'>
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>

      </div>
      <div className="flex-1 p-8 bg-slate-100">
        <Outlet></Outlet>
      </div>
    </div >
  );
};

export default Dashboard;