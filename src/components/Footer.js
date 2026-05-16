import ReturnHome from "./buttons/ReturnHome";
import RegularButton from './buttons/RegularButton';
import { useNavigate } from "react-router";
import '../styles/components/_footer.scss'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className='home-button-container footer-container'>
            <RegularButton title='Retroceder' callback={() => navigate(-1)}></RegularButton>
            <ReturnHome></ReturnHome>
        </div>
    )
}

export default Footer