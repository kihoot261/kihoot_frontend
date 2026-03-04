import { useState, useEffect } from "react";
import { UserAuth } from "../auth/AuthContext";
import Loading from "./Loading";

const Header = () => {
    const { session, getUserData } = UserAuth();
    const [userName, setUserName] = useState('usuari aleatori');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session === undefined) {
            return;
        }

        if (!session) {
            setLoading(false);
            setUserName('usuari aleatori');
            return;
        }
        let isCurrent = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getUserData();
                if (isCurrent && data?.length > 0) {
                    const username = data[0]?.username;
                    setUserName(username);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            } finally {
                if (isCurrent) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isCurrent = false;
        };
    }, [session, getUserData]);

    if (session === undefined || loading) {
        return <Loading />;
    }

    return (
        <span>
            Hola, {userName}
        </span>
    );
};

export default Header;