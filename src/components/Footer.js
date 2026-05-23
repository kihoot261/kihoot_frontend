import ReturnHome from "./buttons/ReturnHome";
import '../styles/components/_footer.scss'
import BackButton from "./buttons/BackButton";

const Footer = () => {

    return (
        <div className='home-button-container footer-container'>
            <BackButton></BackButton>
            <ReturnHome></ReturnHome>
        </div>
    )
}

export default Footer