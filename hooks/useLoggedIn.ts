import {useToken} from "@/hooks/useToken";
import {useEffect, useState} from "react";

export const useLoggedIn = () => {
    const {getToken} = useToken()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                setIsLoggedIn(true);
            }
        };

        checkToken();
    }, [getToken]);

    return isLoggedIn;
};