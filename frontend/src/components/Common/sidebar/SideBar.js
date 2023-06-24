import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import { authActions } from 'features/auth/authSlice';
import {
    profileActions,
    selectProfileData,
} from 'features/profile/profileSlice';
import { useEffect, useState } from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import { BsSearchHeart } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoCreateOutline, IoHomeOutline } from 'react-icons/io5';
import { MdOutlineLibraryMusic } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import thumbnail from '../../../components/Image/thumbnail.png';
import config from '../../../config';
import './SideBar.scss';

export function SideBar() {
    const userProfile = useAppSelector(selectProfileData);
    const [avtImage, setAvtImage] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileActions.fetchProfileData());
    }, []);

    useEffect(() => {
        setAvtImage(userProfile?.upload?.url);
    }, [userProfile]);

    const handleLogout = () => {
        dispatch(authActions.logout());
    };

    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="main-ffc">
                    <div className="logo">YouTune</div>
                    <Link to="/" className="sidebar__row home">
                        <IoHomeOutline className="icon" />
                        <p>Trang chủ</p>
                    </Link>
                    <Link to="/" className="sidebar__row search ">
                        <BsSearchHeart className="icon" />
                        <p>Tìm kiếm</p>
                    </Link>
                    <Link
                        to={config.routes.message}
                        className="sidebar__row messages"
                    >
                        <BiMessageRounded className="icon" />
                        <p>Trò chuyện</p>
                    </Link>
                    <Link to="/" className="sidebar__row notifications">
                        <IoIosNotificationsOutline className="icon" />
                        <p>Thông báo</p>
                    </Link>
                    <Link
                        to={config.routes.listMusic}
                        className="sidebar__row notifications"
                    >
                        <MdOutlineLibraryMusic className="icon" />
                        <p>Nhạc của tôi</p>
                    </Link>
                    <Link to="/" className="sidebar__row create">
                        <IoCreateOutline className="icon" />
                        <p>Bài viết mới</p>
                    </Link>
                    <Link to={config.routes.profile} className="profile">
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
    );
}
