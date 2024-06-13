import {auth, provider} from "../config/firebase";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";


export const Login = () => {
    const navigate =useNavigate();
    const singInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate("/")
    }
    return (
        <div className="login">
            <p>Sign in with Google to continue</p>
            <button onClick={singInWithGoogle}> Sing in</button>
        </div>
    )
}