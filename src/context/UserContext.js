import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

axios.defaults.baseURL = "http://10.0.0.8:3001";
axios.defaults.withCredentials = true;

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {


        if (!user && setReady === true) {
            axios.get('/api/user/get-user')
                .then(({data}) => {
                    setReady(true);
                    setUser(data);

                }).catch(err=>{
                setUser(null)
                setReady(false)
            });
        }
    }, []);




    return (
        <UserContext.Provider value={{user,setUser,ready, setReady}}>
            {children}
        </UserContext.Provider>
    );
}
