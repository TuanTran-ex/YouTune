import { Modal } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import { authActions } from 'features/auth/authSlice';
import { selectPost } from 'features/create/createPostSlice';
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
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import thumbnail from '../../../components/Image/thumbnail.png';
import config from '../../../config';
import '../navigation/Navigation.scss';
import './SideBar.scss';
import { isM, isXM } from 'utils/mediaResponse';

export function SideBar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userProfile = useAppSelector(selectProfileData);
    const [avtImage, setAvtImage] = useState();
    const [searchMode, setSearchMode] = useState(false);
    const [notifiMode, setNotifiMode] = useState(false);
    const [open, setOpen] = useState(
        localStorage.getItem('create_mode') ? true : false,
    );
    const data = useAppSelector(selectPost);

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

    // Media responsive
    const viewPort = useViewport();
    // const isXM = viewPort.width < 769;
    // const isM = 1300;

    useEffect(() => {
        dispatch(profileActions.fetchProfileData());
    }, []);

    useEffect(() => {
        setAvtImage(userProfile?.upload?.url);
    }, [userProfile]);

    const handleLogout = () => {
        dispatch(authActions.logout());
    };

    const handleClickBtnSearch = () => {
        setSearchMode(true);
    };

    const handleClickBtnNotifi = () => {
        setNotifiMode(true);
    };

    const handClickBtnCreate = () => {
        setOpen(true);
        localStorage.setItem('create_mode', true);
    };

    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('create_mode');
    };

    //For nav
    const handClickBtnMusic = () => {
        history.push(`${config.routes.listMusic}`);
    };

    const handClickBtnMessage = () => {
        history.push(`${config.routes.message}`);
    };

    const handleClickBtnHome = () => {
        history.push('/');
    };

    useEffect(() => {
        if (data !== undefined) {
            handleClose();
        }
    }, [data]);

    return (
        <div className="container">
            {viewPort.width <= isM ? (
                <div className={viewPort.width <= isXM ? 'nav-hzt' : 'nav-vtc'}>
                    <div
                        className={
                            viewPort.width <= isXM ? 'horizontal' : 'vertical'
                        }
                    >
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
                                    onClick={handleClickBtnHome}
                                />
                            </li>
                            <li className="nav-item">
                                <BsSearchHeart
                                    className="icon"
                                    onClick={handleClickBtnSearch}
                                />
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
                                    onClick={handleClickBtnNotifi}
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

                            <li className="nav-item ">
                                <Link
                                    to={config.routes.profile}
                                    className="profile"
                                >
                                    <Image
                                        src={avtImage ?? thumbnail}
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="sidebar">
                    <div className="sidebar-wrapper">
                        <div className="main-ffc">
                            <div className="logo">YouTune</div>
                            <Link to="/" className="sidebar__row home">
                                <IoHomeOutline className="icon" />
                                <p>Trang chủ</p>
                            </Link>
                            <button
                                onClick={handleClickBtnSearch}
                                className="sidebar__row search "
                            >
                                <BsSearchHeart className="icon" />
                                <p>Tìm kiếm</p>
                            </button>
                            <Link
                                to={config.routes.message}
                                className="sidebar__row messages"
                            >
                                <BiMessageRounded className="icon" />
                                <p>Trò chuyện</p>
                            </Link>
                            <button
                                onClick={handleClickBtnNotifi}
                                className="sidebar__row notifications"
                            >
                                <IoIosNotificationsOutline className="icon" />
                                <p>Thông báo</p>
                            </button>
                            <Link
                                to={config.routes.listMusic}
                                className="sidebar__row notifications"
                            >
                                <MdOutlineLibraryMusic className="icon" />
                                <p>Nhạc của tôi</p>
                            </Link>
                            <button
                                className="sidebar__row create"
                                onClick={handClickBtnCreate}
                            >
                                <IoCreateOutline className="icon" />
                                <p>Bài viết mới</p>
                            </button>
                            <Link
                                to={config.routes.profile}
                                className="profile"
                            >
                                <div className="wrap-avatar">
                                    <Image
                                        src={avtImage ?? thumbnail}
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </div>
                                <p> {userProfile?.username}</p>
                            </Link>
                        </div>

                        <div className="logout" onClick={handleLogout}>
                            <CiLogout className="logout-icon" />
                            <button className="btn-logout">Logout</button>
                        </div>
                    </div>
                </div>
            )}

            {open ? (
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div>
                            <Create
                                avatar={avtImage}
                                username={userProfile?.username}
                            />
                        </div>
                    </Modal>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
