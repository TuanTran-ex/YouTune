import { SideBar } from 'components/Common';
import Image from 'components/Image/Images';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link, useHistory } from 'react-router-dom';
import config from '../../../config';
import './ProfilePage.scss';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    profileActions,
    selectLoading,
    selectProfileData,
} from '../profileSlice';
import { useAppSelector } from 'app/hooks';
import { LinearProgress } from '@mui/material';

function ProfilePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useAppSelector(selectProfileData);
    const loading = useAppSelector(selectLoading);

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

    const handleClickBtnEdit = () => {
        history.push(`${config.routes.uploadProfile}`);
    };

    const handleClickBtnSetting = () => {
        history.push(`${config.routes.setting}`);
    };

    useEffect(() => {
        dispatch(profileActions.fetchProfileData());
    }, []);

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
                            src="https://i.pinimg.com/originals/c2/a5/e2/c2a5e2156eeb68abbbfe01e68ef41d54.jpg"
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
                                    to="/profile/upload"
                                    className="btn-edit"
                                    onClick={handleClickBtnEdit}
                                >
                                    <p>Edit profile</p>
                                </button>
                                <div className="options">
                                    <IoSettingsOutline className="icon" />
                                    <p>options</p>
                                </div>
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
                            onClick={handleClickBtnSetting}
                        >
                            <p>Setting profile</p>
                        </button>
                    </div>
                ) : (
                    ''
                )}

                <div className="posts"></div>
            </div>
        </div>
    );
}

export default ProfilePage;
