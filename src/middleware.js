import { useDispatch, useSelector } from "react-redux"
import { login } from "./store";

import { useEffect } from "react";

export const useCheckAuth = () => {
    // const selector = useSelector((state) => state.user);
    const dispatch = useDispatch();

 

    useEffect(() => {
      
            const token = localStorage.getItem('token');
            if (token) {

                fetch('http://192.168.1.99/tar/check_auth.php', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`  // ارسال توکن در هدر
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                       
                        dispatch(login({ username: data.user.username, name: data.user.name, code: data.user.code, image: data.user.image }));

                    })
                    .catch(error => {
                        console.error('Error:', error)
                        localStorage.removeItem("token");
                        window.location.replace("/login.html");
                    });




            } else {
                console.log('No token found');
                 window.location.replace("/login.html");
            }



       
    }, [])




    /*
    if (selector.username==="") {
        window.location.replace("/login");
       console.log("no access ");
       
    }else {
        console.log("okkk access ");
    }

    */
}