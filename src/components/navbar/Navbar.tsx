import {Link} from "react-router-dom";
import {auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth"
import logo from "./logo.jpg"
import "./navbar.css"

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const logOut = async () => {
       await signOut(auth);
    }


    return <div className="navbar">
        <div className="logo">
            <img src={logo} width="100" height="90" />
            <p>Home Recipes</p>
        </div>

        <div className="links">

            <Link to="/">Home</Link>
            {!user ?<Link to="/login">Login</Link>
                : <Link to="/myRecipes">My Recipes</Link>
            }

        </div>

        <div className="user">
            {user &&
                <>
                <p> {user?.displayName}</p>
            <img src={user?.photoURL || ""} width="50" height="50"/>
            <button onClick={logOut}> Log out</button>
                </>
            }
        </div>

    </div>
}