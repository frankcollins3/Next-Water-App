// @redux/toolkit state management
import { RootState } from 'redux/store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { SET_HYDRO_SCHEDULE } from 'redux/main/mainSlice'

// components and styling
import Container from "react-bootstrap/Container"
import Settings from "components/elements/Settings"
import styles from "./WaterThoughts.module.scss"

// utils
import { useImage } from "Contexts/ImgContext"
import { nothingFunc } from "utility/UtilityValues"

export default function WaterThoughts() {
    // text in the thoughts and size to make this a dynamic component.
    return <RENDER />
}

function RENDER() {

    const SHOW_HYDRO_SETTINGS = useSelector((state: RootState) => state.main.SHOW_HYDRO_SETTINGS)
    const INTRO_WATER_DROP_IS_HOVERED = useSelector((state: RootState) => state.main.INTRO_WATER_DROP_IS_HOVERED)    

    return (
        <Container id={styles.cont}>
            {/* {
                HYDRO_SETTINGS
                    ?
                    <Settings/>
            : */}
                    <>
                    {/* planned <Component-Composition> to assert "Your New Drip" -> Your New You (the You would come from same "YOUR" change color to change letters...             but nvm all of it ) */}
                        <p className="ghost"> hi </p>
                        <h2 className={styles.text}> new <span id={styles.yoursBluely}>DRIP! </span>  </h2>
                        {/* <h2 id={styles.yoursBluely} className={INTRO_WATER_DROP_IS_HOVERED === true ? "lazyBoop" : ""}> NEW </h2>                         */}
                        {/* <h2 className={styles.text}> DRIP <span id={styles.punctuationSpan}> ! </span> </h2>                                                 */}
                        {/* <h2 className={styles.text}> new <span id={styles.dripSpan} className={INTRO_WATER_DROP_IS_HOVERED ? "lazyBoop" : ""}> drip! </span> </h2> */}
                        <p className="ghost"> hi </p>
                    </>
            {/* } */}
        </Container>
    )
}