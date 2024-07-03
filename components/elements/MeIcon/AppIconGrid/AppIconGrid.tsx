import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store/rootReducer';
import { SET_NON_GOOGLE_IMG_URL } from 'redux/logInOutGoogle/logInOutGoogleSlice';
import { TOGGLE_SHOW_APP_ICONS, TOGGLE_SHOW_WEB_ICONS, TOGGLE_APP_ICONS_BTN_CLICK_FILES, TOGGLE_SELECT_ICON_SCREEN } from 'redux/icons/iconsSlice';
import { useImage } from 'Contexts/ImgContext';
import Boop from 'utility/ParentchildParent/Boop';
import styles from './AppIconGrid.module.scss';

export default function AppIconGrid() {
    const dispatch = useDispatch();
    const NON_GOOGLE_IMG_URL = useSelector((state: RootState) => state.icons.NON_GOOGLE_IMG_URL);
    const SELECT_ICON_SCREEN = useSelector((state: RootState) => state.icons.SELECT_ICON_SCREEN);
    const SHOW_APP_ICONS = useSelector((state: RootState) => state.icons.SHOW_APP_ICONS);
    const SHOW_WEB_ICONS = useSelector((state: RootState) => state.icons.SHOW_WEB_ICONS);
    const APP_ICONS_BTN_CLICK_FILES = useSelector((state: RootState) => state.icons.APP_ICONS_BTN_CLICK_FILES);
    const { bottles, pants, shark, panda, turtle, dolphin, pool, bucket, boat, fileUpload, waterDrop } = useImage();

    const onChangeFileUpload = (event) => {
        console.log('event', event);
        const files = event.target.files;
        console.log('files', files);
        if (!files || !files[0]) {
            return;
        }
    
        const file = files[0];
        const imageUrl = URL.createObjectURL(file);

        // Example: Extracting the file name        
        dispatch(SET_NON_GOOGLE_IMG_URL(imageUrl)); // Dispatch the serializable payload
        dispatch(TOGGLE_SELECT_ICON_SCREEN())
    };

    const clickBoatIcon = () => {
        if (SHOW_APP_ICONS) {
            dispatch(TOGGLE_SHOW_APP_ICONS());
        }
        if (!SHOW_WEB_ICONS) {
            dispatch(TOGGLE_SHOW_WEB_ICONS());
        }
    };

    const goBackFromFiles = () => {
        if (APP_ICONS_BTN_CLICK_FILES) {
            dispatch(TOGGLE_APP_ICONS_BTN_CLICK_FILES());
        }
    };

    const RENDER = () => {
        return (
            <>
                {!SELECT_ICON_SCREEN && !APP_ICONS_BTN_CLICK_FILES ? (
                    <>
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={null} boat={null} className={styles.img}>
                        {/* <Boop rotateAngle={45} speed={800} className={styles.img} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={SELECT_ICON_SCREEN} showBoat={null} } > */}
                            <img className={styles.img} src={bottles} alt="Bottles" />
                        </Boop>
                        

                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={null} boat={null} className={styles.img}>
                        {/* <Boop rotateAngle={45} speed={800} className={styles.img}> */}
                            <img className={styles.img} src={pants} alt="Pants" />
                        </Boop>

                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={null} boat={null} className={styles.img}>
                        {/* <Boop rotateAngle={45} speed={800} className={styles.img}> */}
                            <img className={styles.img} src={shark} alt="Shark" />
                        </Boop>

                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={null} boat={null} className={styles.img}>
                        {/* <Boop rotateAngle={45} speed={800} className={styles.img}> */}
                            <img className={styles.img} src={panda} alt="Panda" />
                        </Boop>

                        <img onClick={clickBoatIcon} className={[styles.img, "moveBoatR"].join(" ")} src={boat} alt="Boat" />


                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={null} boat={null} className={styles.img}>
                            <img className={styles.img} src={turtle} alt="Turtle" />
                        </Boop>

                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={null} boat={null} className={styles.img}>
                            <img className={styles.img} src={dolphin} alt="Dolphin" />
                        </Boop>

                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={null} boat={null} className={styles.img}>
                            <img className={styles.img} src={pool} alt="Pool" />
                        </Boop>

                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={null} boat={null} className={styles.img}>
                            <img className={styles.img} src={bucket} alt="Bucket" />
                        </Boop>                        
                    </>
                ) : (
                    APP_ICONS_BTN_CLICK_FILES && (
                        <>
                            <Container id={styles.fileContainer}>
                            <p className="ghost"> yea </p>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={onChangeFileUpload}
                                    accept=".jpg, .jpeg, .png, .pdf"
                                />
                                <label htmlFor="fileInput">
                                    <img id={styles.btnFileUpload} src={fileUpload} alt="Upload File" />
                                </label>
                            <p className="ghost"> yea </p>
                            </Container>
                        </>
                    )
                )}
            </>
        );
    };

    return <Container id={SELECT_ICON_SCREEN === false ? styles.appIconGridContainer : styles.MeIconContainer}>{RENDER()}</Container>;
}
