import Image from 'components/Image/Images';
import { authActions } from 'features/auth/authSlice';
import { useState } from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import { BsSearchHeart } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoCreateOutline, IoHomeOutline } from 'react-icons/io5';
import { MdOutlineLibraryMusic } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../../config';
import './SideBar.scss';

export function SideBar() {
    const [firstState, setfirstState] = useState(false);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
    };

    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="main-ffc">
                    <div className="logo">YouTune</div>
                    <Link to="/" className="sidebar__row home">
                        <IoHomeOutline
                            className={firstState ? 'icon-active' : 'icon'}
                        />
                        <p>Trang chủ</p>
                    </Link>
                    <Link to="/" className="sidebar__row search ">
                        <BsSearchHeart
                            className={firstState ? 'icon-active' : 'icon'}
                        />
                        <p>Tìm kiếm</p>
                    </Link>
                    <Link to="/" className="sidebar__row messages">
                        <BiMessageRounded
                            className={firstState ? 'icon-active' : 'icon'}
                        />
                        <p>Trò chuyện</p>
                    </Link>
                    <Link to="/" className="sidebar__row notifications">
                        <IoIosNotificationsOutline
                            className={firstState ? 'icon-active' : 'icon'}
                        />
                        <p>Thông báo</p>
                    </Link>
                    <Link to="/" className="sidebar__row notifications">
                        <MdOutlineLibraryMusic
                            className={firstState ? 'icon-active' : 'icon'}
                        />
                        <p>Nhạc của tôi</p>
                    </Link>
                    <Link to="/" className="sidebar__row create">
                        <IoCreateOutline
                            className={firstState ? 'icon-active' : 'icon'}
                        />
                        <p>Bài viết mới</p>
                    </Link>
                    <Link to={config.routes.profile} className="profile">
                        <div className="wrap-avatar">
                            <Image
                                src="https://instagram.fdad3-5.fna.fbcdn.net/v/t51.2885-19/340492349_1890714877960041_3203733855701028637_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fdad3-5.fna.fbcdn.net&_nc_cat=109&_nc_ohc=reckWtNh754AX-bkOfj&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBUj2tlDH5gOpQz5TRLpuINSg2jpCV_xYr5YEpB8atfWQ&oe=648E23F3&_nc_sid=f70a57"
                                alt="avatar"
                                className="avatar"
                            />
                        </div>
                        <p>Username</p>
                    </Link>
                </div>

                <div className="logout">
                    <CiLogout className="logout-icon" />
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
