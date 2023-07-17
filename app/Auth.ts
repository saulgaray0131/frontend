import { useEffect } from "react";
import { useCookies } from "react-cookie";
import config from "./config";

interface props {
    setUser: Function
}

function isUserData(item: any): item is UserData {
    return 'id' in item;
}

export default function Auth(props: props) {

    const [authCookie, setCookie, ds] = useCookies(['user']);
    //ds('user')

    useEffect(() => {
        //console.log(authCookie);

        if (!authCookie.user || !isUserData(authCookie.user)) {

            //console.log("Auth not found!")

            fetch(config().apiUrl +  '/api/create/user', {
                method: 'POST',
                body: JSON.stringify({
                    "username": "placeholder_name"
                }),
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${authToken}`,
                }
            })
                .then(results => results.json())
                .then((data: UserData) => {
                    if(!isUserData(data)) {
                        //console.log("bad data", data);
                        ds('user');
                    } else {
                       //console.log("good data", data);
                        setCookie('user', data, {path: '/', maxAge: 5184000});
                        props.setUser(data);
                        //console.log(data);
                    }
                });
        } else {
            //console.log("set data", authCookie.user);

            fetch(config().apiUrl +  '/api/account/data', {
                method: 'POST',
                body: JSON.stringify({
                    user: authCookie.user
                }),
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${authToken}`,
                }
            })
                .then(results => results.json())
                .then((data: UserData) => {
                    if(!isUserData(data)) {
                        //console.log("bad data", data);
                        ds('user');
                    } else {
                        //console.log("good data", data);
                        setCookie('user', data, {path: '/', maxAge: 5184000});
                        props.setUser(data);
                        //console.log(data);
                    }
                });
        }
    }, [])

    
    return null;
}