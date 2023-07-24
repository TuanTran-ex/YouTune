import { LinearProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import { authActions } from 'features/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { isS } from 'utils/mediaResponse';
import thumbnail from '../../../components/Image/thumbnail.png';
import config from '../../../config';
import BlockPost from '../components/BlockPost';
import {
    profileActions,
    selectLoading,
    selectProfileData,
} from '../profileSlice';
import './ProfilePage.scss';

function ProfilePage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userProfile = useAppSelector(selectProfileData);
    const loading = useAppSelector(selectLoading);
    const [avtImage, setAvtImage] = useState();
    localStorage.setItem('show_header', false);

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

    const handleClickBtnLogout = () => {
        dispatch(authActions.logout());
    };

    const handleClickBtnEdit = () => {
        history.push(`${config.routes.uploadProfile}`);
    };

    return (
        <div className="prof-wrapper">
            {loading && <LinearProgress className="loading" />}
            <div className="prof__main-block">
                {viewPort.width <= isS ? (
                    <p className="user-name">{userProfile?.username}</p>
                ) : (
                    ''
                )}
                <div className="header-prof">
                    <div className="avatar-wrap">
                        <Image
                            src={avtImage ?? thumbnail}
                            alt="avatar"
                            className="avatar"
                        />
                    </div>

                    <div className="info">
                        {viewPort.width > isS ? (
                            <div className="row-1">
                                <p className="user-name">
                                    {userProfile?.username}
                                </p>
                                <button
                                    className="btn-edit"
                                    onClick={handleClickBtnEdit}
                                >
                                    Edit profile
                                </button>

                                <button
                                    to="/logout"
                                    className="btn-logout"
                                    onClick={handleClickBtnLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            ''
                        )}

                        <div className="row-2">
                            <div className="post">
                                <p className="quantity">28</p>
                                posts
                            </div>

                            <div className="followers">
                                <p className="quantity">149</p>
                                <Link to="#">followers</Link>
                            </div>
                            <div className="following">
                                <p className="quantity">320</p>
                                <Link to="#">following</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {viewPort.width <= isS ? (
                    <div className="btn-wrap">
                        <button
                            className="btn-edit"
                            onClick={handleClickBtnEdit}
                        >
                            <p>Edit profile</p>
                        </button>
                        <button
                            className="btn-setting"
                            onClick={handleClickBtnLogout}
                        >
                            <p>Logout</p>
                        </button>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="create-post">
                <p className="icon-wrap">
                    <BsPlusLg className="plus-icon" />
                </p>
                <p className="text">New post</p>
            </div>
            <div className="posts">
                <BlockPost
                    infoUpload={userProfile}
                    avatar={avtImage}
                    username={userProfile?.username}
                />
            </div>
        </div>
    );
}

export default ProfilePage;
