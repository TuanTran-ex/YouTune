import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image';
import BlockPost from 'features/profile/components/BlockPost';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { isXS } from 'utils/mediaResponse';
import thumbnail from '../../components/Image/thumbnail.png';
import './PersonPage.scss';
import { personActions, selectUserData } from './personSlice';

function PersonPage() {
    const dispatch = useDispatch();
    const getUserData = useAppSelector(selectUserData);

    const [userData, setUserData] = useState();

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
    let { id } = useParams();

    useEffect(() => {
        dispatch(personActions.fetchUserData(id));
    }, []);

    useEffect(() => {
        setUserData(getUserData);
    }, [getUserData]);

    return (
        <div className="person-page">
            <div className="person-page__infomation">
                <p className="infomation__wrapper--left">
                    <Image
                        src={userData?.avatar ?? thumbnail}
                        alt="avatar"
                        className="left__avatar"
                    />
                </p>
                <section className="infomation__wrapper--right">
                    <div className="infomation__wrapper--row1">
                        <span className="row1__left">
                            <div className="row1__left--username">
                                {userData?.username}

                                {viewPort.width <= isXS ? (
                                    <p
                                        style={{ fontSize: '16px' }}
                                        className="additional"
                                    >
                                        {userData?.full_name}{' '}
                                    </p>
                                ) : (
                                    ''
                                )}
                            </div>

                            <button className="row1__left--follow">
                                Follow
                            </button>
                            <button className="row1__left--add">
                                Add Friend
                            </button>
                        </span>
                        <p className="row1__options">
                            <MoreHorizIcon className="row1__options--icon" />
                        </p>
                    </div>
                    <div className="infomation__wrapper--row2">
                        <p className="row2__posts mr-8">
                            <b className="css-cursor">
                                {userData?.posts?.length
                                    ? userData?.posts?.length
                                    : 0}
                            </b>
                            Post
                        </p>
                        <p className="row2__friends mr-8">
                            <b className="css-cursor">
                                {userData?.friends?.length
                                    ? userData?.friends?.length
                                    : 0}
                            </b>
                            Friends
                        </p>
                        <p className="row2__followers mr-8">
                            <b className="css-cursor">
                                {userData?.followers?.length
                                    ? userData?.followers?.length
                                    : 0}
                            </b>
                            Followers
                        </p>
                        <p className="row2__following">
                            <b className="css-cursor">
                                {userData?.followings?.length
                                    ? userData?.followings?.length
                                    : 0}
                            </b>
                            Following
                        </p>
                    </div>

                    {viewPort.width <= isXS ? (
                        ''
                    ) : (
                        <div className="infomation__wrapper--row3">
                            <p className="row3__fullname">
                                {userData?.full_name}
                            </p>
                        </div>
                    )}

                    <div className="infomation__wrapper--row4">
                        Follow by
                        <ul className="row4__listfollowed">
                            <li className="listfollowed__item">
                                <Link to="#">cam.irinoco</Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <div className="person-page__posts">
                <BlockPost
                    infoUpload={userData}
                    avatar={userData?.avatar}
                    username={userData?.username}
                />
            </div>
        </div>
    );
}

export default PersonPage;
