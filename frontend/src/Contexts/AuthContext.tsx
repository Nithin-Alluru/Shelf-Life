import { createContext, useEffect, useState } from "react";
import { ContextProps, User } from "../types";
import axios from "../../axiosConfig";

const initialUserState:User = {username: '', first_name: '', last_name: '', goal: 0};
export const AuthStore = createContext<{currentUser:User}>({currentUser: initialUserState});
AuthStore.displayName = 'AuthContext';

function AuthContext({children} : ContextProps) {
    const token = sessionStorage.getItem("access_token");
    const [currentUser, setUser] = useState(initialUserState);

    useEffect(() => {
        if (token) {
            axios.get('/user', {
            headers: {
                    "Authorization": `Bearer ${token}`
            }
            }).then((response) => {
                const resp = response.data
                const userData:User = {username: resp.username, first_name: resp.first_name, last_name: resp.last_name, goal: resp.goal}
                setUser(userData);
                sessionStorage.setItem('User', JSON.stringify({username: resp.username, first_name: resp.first_name, last_name: resp.last_name, goal: resp.goal}))
            }).catch((error) => {
                if (error.response.status === 401) {
                    (sessionStorage.removeItem("access_token"));
                    (sessionStorage.removeItem("User"));
                    localStorage.removeItem("creatingComp");
  

                }
                console.log(error);
            });
            }
    }, []);


    
    return (
        <AuthStore.Provider value={{currentUser}}>{children}</AuthStore.Provider>
    )
};
export default AuthContext;
