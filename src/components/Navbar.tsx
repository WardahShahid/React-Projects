import { Link } from "react-router-dom";
import { auth } from "../Config/Firebase";
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth"; 

export  const Navbar =()=>{

        const [user]=useAuthState(auth);     //we can also manage the states of "laoding and error".

        const logout = async()=>{
            await signOut(auth);
        };

    return(

        <div className="navbar">
    <div className="links">
    <Link to="/" >Home </Link>
   
    {user ?
    (<Link to="/createpost" >Create Post</Link>):
    (<Link to="/login" >Login </Link>)
   }
    </div>
    
    <div className="user">
    {user && (
        <>
        <img src={user?.photoURL || " "} width={20} height={20}/>
        <p>{user?.displayName}</p>
        <button onClick={logout}>Log out</button>
        </>
    )}
   </div>
        </div>
        
    )
    };



