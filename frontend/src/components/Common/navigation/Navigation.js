import { Modal } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import Create from 'features/create/page/Create';
import {
    profileActions,
    selectProfileData,
} from 'features/profile/profileSlice';
import React, { useEffect, useState } from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import { BsSearchHeart } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { FcMusic } from 'react-icons/fc';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoCreateOutline, IoHomeOutline } from 'react-icons/io5';
import { MdOutlineLibraryMusic } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { isXM } from 'utils/mediaResponse';
import config from '../../../config';
import Image from '../../Image';
import thumbnail from '../../Image/thumbnail.png';
import { Search } from '../search/Search';
import './Navigation.scss';

export function Navigation() {
    const userProfile = useAppSelector(selectProfileData);
    const [avtImage, setAvtImage] = useState();
    const [searchMode, setSearchMode] = useState(false);
    const [createMode, setCreateMode] = useState(
        localStorage.getItem('create_mode') ?? false,
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const useViewport = () => {
        const [width, setWidth] = React.useState(window.innerWidth);

        React.useEffect(() => {
            const handleWindowResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleWindowResize);
            return () =>
                window.removeEventListener('resize', handleWindowResize);
        }, []);

        return { width };
    };
    const viewPort = useViewport();

    useEffect(() => {
        dispatch(profileActions.fetchProfileData());
    }, []);

    useEffect(() => {
        setAvtImage(userProfile?.upload?.url);
    }, [userProfile]);

    const handClickBtnHome = () => {
        history.push('/');
    };

    const handClickBtnMessage = () => {
        history.push(`${config.routes.message}`);
    };
    const handClickBtnNotifi = () => {};

    const handClickBtnMusic = () => {
        history.push(`${config.routes.music}`);
    };

    const handClickBtnCreate = () => {
        setCreateMode(true);
        localStorage.setItem('create_mode', true);
    };

    const handleClose = () => {
        setCreateMode(false);
        localStorage.removeItem('create_mode', false);
    };

    const handleLogout = () => {
        dispatch(authActions.logout());
    };

    const handleClickBtnSearch = () => {
        setSearchMode(!searchMode);
    };
    return (
        <>
            <ul className="nav-list">
                {viewPort.width <= isXM ? (
                    ''
                ) : (
                    <div className="logo">
                        <FcMusic className="icon" />
                    </div>
                )}

                <li className="nav-item">
                    <IoHomeOutline
                        className="icon"
                        onClick={handClickBtnHome}
                    />
                </li>
                {viewPort.width > isXM ? (
                    <li className="nav-item">
                        <BsSearchHeart
                            className="icon"
                            onClick={handleClickBtnSearch}
                        />
                    </li>
                ) : (
                    ''
                )}

                <li className="nav-item">
                    <BiMessageRounded
                        className="icon"
                        onClick={handClickBtnMessage}
                    />
                </li>
                {viewPort.width > isXM ? (
                    <li
                        className="nav-item"
                        onClick={() => handClickBtnNotifi()}
                    >
                        <IoIosNotificationsOutline className="icon" />
                    </li>
                ) : (
                    ''
                )}
                <li className="nav-item">
                    <MdOutlineLibraryMusic
                        className="icon"
                        onClick={handClickBtnMusic}
                    />
                </li>
                <li className="nav-item">
                    <IoCreateOutline
                        className="icon"
                        onClick={handClickBtnCreate}
                    />
                </li>

                <li className="nav-item">
                    <Link to={config.routes.profile} className="profile">
                        <div className="wrap-avatar">
                            <Image
                                src={avtImage ?? thumbnail}
                                alt="avatar"
                                className="avatar"
                            />
                        </div>
                    </Link>
                </li>

                {createMode ? (
                    <div>
                        <Modal
                            open={createMode}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div>
                                <Create />
                            </div>
                        </Modal>
                    </div>
                ) : (
                    ''
                )}

                {viewPort.width <= 768 ? (
                    ''
                ) : (
                    <li className="nav-item">
                        <CiLogout className="icon" onClick={handleLogout} />
                    </li>
                )}
            </ul>

            <div
                className={
                    searchMode && viewPort.width > isXM
                        ? 'search-block enter'
                        : 'search-block '
                }
            >
                <Search />
            </div>
        </>
    );
}
