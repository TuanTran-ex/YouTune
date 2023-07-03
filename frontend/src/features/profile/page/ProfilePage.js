import { LinearProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import { authActions } from 'features/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import thumbnail from '../../../components/Image/thumbnail.png';
import config from '../../../config';
import {
    profileActions,
    selectLoading,
    selectProfileData,
} from '../profileSlice';
import './ProfilePage.scss';
import BlockPost from '../components/BlockPost';
import { BsPlusLg } from 'react-icons/bs';
import { selectPost } from 'features/create/createPostSlice';

function ProfilePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useAppSelector(selectProfileData);
    const loading = useAppSelector(selectLoading);
    const [overlay, setOverlay] = useState(false);
    const data = useSelector(selectPost);

    const [avtImage, setAvtImage] = useState();

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

    const handleCreateNewPost = () => {
        setOverlay(true);
    };

    return (
        <div className="prof-wrapper">
            {loading && <LinearProgress className="loading" />}
            <div className="prof__main-block">
                {viewPort.width <= 576 ? (
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
                        {viewPort.width > 576 ? (
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

                {viewPort.width <= 576 ? (
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
                <p className="icon-wrap" onClick={handleCreateNewPost}>
                    <BsPlusLg className="plus-icon" />
                </p>
                <p className="text">New post</p>
            </div>
            <div className="posts">
                <BlockPost
                    data={data}
                    avatar={avtImage}
                    username={userProfile?.username}
                />
            </div>
        </div>
    );
}

export default ProfilePage;
