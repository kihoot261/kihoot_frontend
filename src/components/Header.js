import { useState, useEffect } from "react";
import { UserAuth } from "../utils/AuthContext";
import Loading from "./Loading";
import '../styles/components/_header.scss';
import { useLocation } from "react-router";
import { getBreadcrumb } from "../utils/methods";

const Header = () => {
    const { session, getUserData } = UserAuth();
    const [userName, setUserName] = useState('usuario aleatorio');
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const breadcrumb = getBreadcrumb(location.pathname);

    useEffect(() => {
        if (session === undefined) {
            return;
        }

        if (!session) {
            setLoading(false);
            setUserName('usuario aleatorio');
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
        <div>
            {
                (location.pathname !== '/') ?
                    (
                        <div className="header-container">
                            <h3 className="header-breadcrumb">{breadcrumb}</h3>
                            <span className="header-span header-span--general">
                                Hola, 
                                <h3>{userName}</h3>
                            </span>
                        </div>
                    ) : (
                        <span className="header-span header-span--home">
                            Hola, {userName}
                        </span>
                    )
            }
        </div>
    );
};

export default Header;