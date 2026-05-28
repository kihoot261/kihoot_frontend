import { useState, useEffect } from "react";
import { UserAuth } from "../utils/AuthContext";
import Loading from "./Loading";
import '../styles/components/_header.scss';
import { useLocation, useNavigate } from "react-router";
import kanku from '../images/kanku.png'
import BlackCornerWhiteBgButton from "./buttons/BlackCornerWhiteBgButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCircleInfo, faDumbbell, faFileLines, faHandFist } from "@fortawesome/free-solid-svg-icons";
import { breadcrumbLocated } from "../utils/methods";
import variables from '../styles/utils/_variables.scss';

const Header = () => {
    const { session, getUserData } = UserAuth();
    const [userName, setUserName] = useState('usuario aleatorio');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

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
        <div className="header-container">
            <div className="header-kanku-breadcrumb-container header-span header-span--general">
                <img src={kanku} alt="kanku" className="kanku-logo-styling" onClick={() => navigate('/')}></img>
                {/*<h3 className="breadcrumb-item">{breadcrumb}</h3>*/}
            </div>

            <div className="icons-header-navigation-container">
                <div>
                    <BlackCornerWhiteBgButton
                        title={<FontAwesomeIcon className="fontawesome-icon fontawesome-icon--header-icon"
                            icon={faFileLines}></FontAwesomeIcon>}
                        callback={() => navigate('/setupquiz')}
                        bgColor={breadcrumbLocated(location.pathname, 'partida') ? variables.kihoot_gold : ''}
                    ></BlackCornerWhiteBgButton>
                </div>
                <div>
                    <BlackCornerWhiteBgButton
                        title={<FontAwesomeIcon className="fontawesome-icon fontawesome-icon--header-icon"
                            icon={faCircleInfo}></FontAwesomeIcon>}
                        callback={() => navigate('/info')}
                        bgColor={breadcrumbLocated(location.pathname, 'recursos') ? variables.kihoot_gold : ''}
                    ></BlackCornerWhiteBgButton>
                </div>
                <div>
                    <BlackCornerWhiteBgButton
                        title={<FontAwesomeIcon className="fontawesome-icon fontawesome-icon--header-icon"
                            icon={faDumbbell}></FontAwesomeIcon>}
                        callback={() => navigate('/routines')}
                        bgColor={breadcrumbLocated(location.pathname, 'rutina') ? variables.kihoot_gold : ''}
                    ></BlackCornerWhiteBgButton>
                </div>
                <div>
                    <BlackCornerWhiteBgButton
                        title={<FontAwesomeIcon className="fontawesome-icon fontawesome-icon--header-icon"
                            icon={faCalendar}></FontAwesomeIcon>}
                        callback={() => navigate('/events')}
                        bgColor={breadcrumbLocated(location.pathname, 'evento') ? variables.kihoot_gold : ''}
                    ></BlackCornerWhiteBgButton>
                </div>
                <div>
                    <BlackCornerWhiteBgButton
                        title={<FontAwesomeIcon className="fontawesome-icon fontawesome-icon--header-icon"
                            icon={faHandFist}></FontAwesomeIcon>}
                        callback={() => navigate('/techniques')}
                        bgColor={breadcrumbLocated(location.pathname, 'técnica') ? variables.kihoot_gold : ''}
                    ></BlackCornerWhiteBgButton>
                </div>
            </div>

            <div className="header-span-container">
                <span className="header-span header-span--general" onClick={() => navigate('/myprofile')}>
                    Hola,
                    <h3 className="username-link">{userName}</h3>
                </span>
            </div>

        </div>
    );
};

export default Header;