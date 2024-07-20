import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Booking.com</Link>
                </span>

                <span className="flex space-x-2">
                    {isLoggedIn ?
                        (<>
                            <Link
                                className="flex items-center text-white px-3 font-medium hover:bg-blue-400 duration-300"
                                to="/my-bookings">My Bookings</Link>
                            <Link
                                className="flex items-center text-white px-3 font-medium hover:bg-blue-400 duration-300"
                                to="/my-hotels">My Hotels</Link>
                            <LogoutButton />
                        </>
                        )
                        :
                        (<Link to="/login" className="bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-blue-500">
                            Login
                        </Link>
                        )
                    }
                </span>
            </div>
        </div>
    )
}

export default Header