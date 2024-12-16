import { Navigate } from "react-router-dom";
import {useContext, useEffect } from "react";
import {UserContext} from "./UserContext";

export default function ProtectedRoute({ children }) {
    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
        credentials: 'include',
        }).then(response => {
        response.json().then(userInfo => {
            setUserInfo(userInfo);
        });
        });
    }, []);

    if (userInfo?.isAdmin) {
        return children;        
    }

    return <Navigate to="/" />;
}
