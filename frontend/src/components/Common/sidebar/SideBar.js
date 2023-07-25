import { Modal } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import { authActions } from 'features/auth/authSlice';
import { selectCreateMode } from 'features/create/createPostSlice';
import Create from 'features/create/page/Create';
import {
    profileActions,
    selectProfileData,
} from 'features/profile/profileSlice';
import React, { useEffect, useRef, useState } from 'react';
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
import { isM, isXM } from 'utils/mediaResponse';
import thumbnail from '../../../components/Image/thumbnail.png';
import config from '../../../config';
import { Search } from '../search/Search';
import './SideBar.scss';
import './SideBar_MB.scss';

export function SideBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const wrapperRef = useRef(null);

    const userProfile = useAppSelector(selectProfileData);
    const createMode = useAppSelector(selectCreateMode);
    const [avtImage, setAvtImage] = useState();
    const [searchMode, setSearchMode] = useState(false);

    const [open, setOpen] = useState(
        localStorage.getItem('create_mode') ? true : false,
    );

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSearchMode(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(wrapperRef);

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
        localStorage.removeItem('id_image');
        setSearchMode(!searchMode);
    };

    const hanldeSearchUnderXM = () => {};

    const handleClickBtnNotifi = () => {
        localStorage.removeItem('id_image');
    };

    const handClickBtnCreate = () => {
        setOpen(true);
        localStorage.removeItem('id_image');
        localStorage.setItem('create_mode', true);
    };

    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('create_mode');
    };

    //For nav
    const handClickBtnMusic = () => {
        localStorage.removeItem('id_image');
        history.push(`${config.routes.listMusic}`);
    };

    const handClickBtnMessage = () => {
        localStorage.removeItem('id_image');
        history.push(`${config.routes.message}`);
    };

    const handleClickBtnHome = () => {
        localStorage.removeItem('id_image');
        history.push('/');
    };

    useEffect(() => {
        if (createMode === true) handleClose();
    }, [createMode]);

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
                            {viewPort.width > isXM ? (
                                <li className="nav-item">
                                    <BsSearchHeart
                                        className="icon"
                                        onClick={
                                            viewPort.width <= isXM
                                                ? hanldeSearchUnderXM
                                                : handleClickBtnSearch
                                        }
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
                                <li className="nav-item">
                                    <IoIosNotificationsOutline
                                        className="icon"
                                        onClick={handleClickBtnNotifi}
                                    />
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

                            <li className="nav-item ">
                                <Link
                                    to={config.routes.profile}
                                    className="profile"
                                    onClick={() => {
                                        localStorage.removeItem('id_image');
                                    }}
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
            ) : !searchMode ? (
                <div className="sidebar">
                    <div className="sidebar-wrapper">
                        <div className="main-ffc">
                            <div className="logo">YouTune</div>
                            <Link
                                to="/"
                                className="sidebar__row home"
                                onClick={() => {
                                    localStorage.removeItem('id_image');
                                }}
                            >
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
                                onClick={() => {
                                    localStorage.removeItem('id_image');
                                }}
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
                                onClick={() => {
                                    localStorage.removeItem('id_image');
                                }}
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
                                onClick={() => {
                                    localStorage.removeItem('id_image');
                                }}
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
            ) : (
                <div className="sidebar-sm">
                    <div className="nav-vtc">
                        <div className="vertical">
                            <ul className="nav-list-sm">
                                <div className="logo-sm">
                                    <FcMusic className="icon" />
                                </div>

                                <li className="nav-item-sm">
                                    <IoHomeOutline
                                        className="icon"
                                        onClick={handleClickBtnHome}
                                    />
                                </li>
                                <li className="nav-item-sm">
                                    <BsSearchHeart
                                        className="icon"
                                        onClick={handleClickBtnSearch}
                                    />
                                </li>
                                <li className="nav-item-sm">
                                    <BiMessageRounded
                                        className="icon"
                                        onClick={handClickBtnMessage}
                                    />
                                </li>
                                <li className="nav-item-sm">
                                    <IoIosNotificationsOutline
                                        className="icon"
                                        onClick={handleClickBtnNotifi}
                                    />
                                </li>
                                <li className="nav-item-sm">
                                    <MdOutlineLibraryMusic
                                        className="icon"
                                        onClick={handClickBtnMusic}
                                    />
                                </li>
                                <li className="nav-item-sm">
                                    <IoCreateOutline
                                        className="icon"
                                        onClick={handClickBtnCreate}
                                    />
                                </li>

                                <li className="nav-item-sm">
                                    <Link
                                        to={config.routes.profile}
                                        className="profile"
                                        onClick={() => {
                                            localStorage.removeItem('id_image');
                                        }}
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
                            <Create />
                        </div>
                    </Modal>
                </div>
            ) : (
                ''
            )}
            {viewPort.width > isXM ? (
                <div
                    ref={wrapperRef}
                    className={
                        searchMode && viewPort.width > isXM
                            ? 'search-block enter'
                            : 'search-block '
                    }
                >
                    <Search />
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
