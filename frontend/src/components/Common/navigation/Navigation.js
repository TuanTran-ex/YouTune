import { useAppSelector } from 'app/hooks';
import {
    profileActions,
    selectProfileData,
} from 'features/profile/profileSlice';
import React, { useEffect, useState } from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import { BsSearchHeart } from 'react-icons/bs';
import { FcMusic } from 'react-icons/fc';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoCreateOutline, IoHomeOutline } from 'react-icons/io5';
import { MdOutlineLibraryMusic } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Image from '../../Image';
import thumbnail from '../../Image/thumbnail.png';
import './Navigation.scss';
import config from '../../../config';
import { CiLogout } from 'react-icons/ci';
import { authActions } from 'features/auth/authSlice';

export function Navigation() {
    const userProfile = useAppSelector(selectProfileData);
    const [avtImage, setAvtImage] = useState();
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
    const handClickBtnSearch = () => {};

    const handClickBtnMessage = () => {
        history.push(`${config.routes.message}`);
    };
    const handClickBtnNotifi = () => {};

    const handClickBtnMusic = () => {
        history.push(`${config.routes.music}`);
    };
    const handClickBtnCreate = () => {};

    const handleLogout = () => {
        dispatch(authActions.logout());
    };

    return (
        <ul className="nav-list">
            {viewPort.width <= 768 ? (
                ''
            ) : (
                <div className="logo">
                    <FcMusic className="icon" />
                </div>
            )}

            <li className="nav-item">
                <IoHomeOutline className="icon" onClick={handClickBtnHome} />
            </li>
            <li className="nav-item">
                <BsSearchHeart className="icon" onClick={handClickBtnSearch} />
            </li>
            <li className="nav-item">
                <BiMessageRounded
                    className="icon"
                    onClick={handClickBtnMessage}
                />
            </li>
            <li className="nav-item">
                <IoIosNotificationsOutline
                    className="icon"
                    onClick={handClickBtnNotifi}
                />
            </li>
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

            {viewPort.width <= 768 ? (
                ''
            ) : (
                <li className="nav-item">
                    <CiLogout className="icon" onClick={handleLogout} />
                </li>
            )}
        </ul>
    );
}
