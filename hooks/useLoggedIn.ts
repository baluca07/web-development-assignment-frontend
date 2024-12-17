import {useToken} from "@/hooks/useToken";
import {useEffect, useState} from "react";

export const useLoggedIn = () => {
    const {token,getToken} = useToken()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkToken = () => {
            if (token) {
                setIsLoggedIn(true);
            }
        };

        checkToken();
    }, [getToken]);

    return isLoggedIn;
};