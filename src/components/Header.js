import { UserAuth } from "../auth/AuthContext"
import Loading from "./Loading";

const Header = () => {

    const { session } = UserAuth();

    if (session === undefined) {
        return <Loading></Loading>
    }

    return (
        <>{session ? <div>Hi {session?.user?.user_metadata?.username}</div> : <div>Hi random user</div>}</>
    )
}

export default Header