import {useEffect, useState} from 'react';
import jwt from 'jsonwebtoken';
import {useToken} from "@/hooks/useToken";

export const useAdminCheck = () => {
    const {getToken} = useToken()
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const checkAdminRole = async () => {
            const token = await getToken();
            if (token) {
                const decoded: any = jwt.decode(token);
                if (decoded && decoded.roles && decoded.roles.includes('ROLE_ADMIN')) {
                    setIsAdmin(true);
                }
            }
        };

        checkAdminRole();
    }, [getToken]);

    return isAdmin;
};
