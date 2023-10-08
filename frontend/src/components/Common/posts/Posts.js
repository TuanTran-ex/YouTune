import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Dialog } from '@mui/material';
import Image from 'components/Image/Images';
import { api_listPosts } from 'mock_api';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuSmile } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import { isXS } from 'utils/mediaResponse';
import './Posts.scss';
import config from 'config';

export function Posts() {
    const ref = useRef([]);
    const [showDialog, setShowDialog] = useState(false);
    const [checkUnFollow, setCheckUnFollow] = useState(false);
    const [followMode, setFollowMode] = useState(false);
    const [arrayImg, setArrayImg] = useState({});
    const [userInfo, setUserInfo] = useState();
    const [listInfo, setListInfo] = useState([]);

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

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    const handleClickBtnMore = (id) => {
        let temp;
        for (let item of listAccount) {
            if (item.id === id) {
                temp = {
                    id: item.id,
                    avatar: item.avatar,
                    username: item.username,
                };
            }
        }
        setUserInfo(temp);
        setShowDialog(true);
    };

    const handClickBtnCmt = (index) => {
        handleClickPicker(index, false);
        if (ref.current) {
            ref.current[index].focus();
        }
    };

    const handleClickBtnLike = (id) => {
        let cloneListInfo = [...listInfo];

        for (let item of cloneListInfo) {
            if (item.id === id) {
                cloneListInfo[id - 1].status = !cloneListInfo[id - 1].status;
                break;
            }
        }
        setListInfo(cloneListInfo);
    };

    const handleInputChange = (e, id) => {
        let cloneListInfo = [...listInfo];
        for (let item of cloneListInfo) {
            if (item.id === id) {
                cloneListInfo[item.id - 1].content = e.target.value;
            }
        }

        if (e.target.value.trim().length === 0)
            for (let item of cloneListInfo) {
                if (item.id === id) {
                    cloneListInfo[item.id - 1].send = false;
                }
            }
        else {
            for (let item of cloneListInfo) {
                if (item.id === id) {
                    cloneListInfo[item.id - 1].send = true;
                }
            }
        }

        setListInfo(cloneListInfo);
    };

    const handlePostCmt = () => {};

    const handleClickUnfollow = () => {
        setFollowMode(true);
        setCheckUnFollow(false);
    };

    const listAccount = api_listPosts;

    useEffect(() => {
        let temp2 = {};
        let cloneListInfo = [];
        for (let item of listAccount) {
            temp2[item.id] = {
                index: 0,
                url: item.posts[0].url,
            };

            cloneListInfo.push({
                id: item.id,
                content: '',
                like: false,
                cmt: false,
                send: false,
                icon: false,
            });
        }

        setArrayImg(temp2);
        setListInfo(cloneListInfo);
    }, []);

    const handleClickPrevImage = (id) => {
        const listAccountClone = [...listAccount];
        const arrayImgClone = { ...arrayImg };

        for (let item of listAccountClone) {
            if (item.id === id) {
                const idImgSelect = arrayImgClone[item.id].index - 1;
                if (idImgSelect < 0) {
                    return;
                }

                const srcImgSelect = item.posts[idImgSelect].url;
                arrayImgClone[item.id] = {
                    index: idImgSelect,
                    url: srcImgSelect,
                };
            }
        }

        setArrayImg(arrayImgClone);
    };

    const handleClickNextImage = (id) => {
        const listAccountClone = [...listAccount];
        const arrayImgClone = { ...arrayImg };

        for (let item of listAccountClone) {
            if (item.id === id) {
                const idImgSelect = arrayImgClone[item.id].index + 1;

                if (idImgSelect > item.posts.length) {
                    return;
                }

                const srcImgSelect = item.posts[idImgSelect].url;
                arrayImgClone[item.id] = {
                    index: idImgSelect,
                    url: srcImgSelect,
                };
            }
        }

        setArrayImg(arrayImgClone);
    };

    const addValueForInput = (array, item, value) => {
        for (let i of array) {
            if (item.id === i.id) {
                array[item.id - 1].content = value;
                array[item.id - 1].send = true;
            }
        }
        setListInfo(array);
    };

    const handleClickPicker = (index, status) => {
        let cloneListInfo = [...listInfo];
        for (let i of cloneListInfo) {
            if (index === i.id) {
                cloneListInfo[index - 1].icon = status;
            }
        }

        setListInfo(cloneListInfo);
    };

    return (
        <>
            <ul className="list-hb">
                {listAccount?.map((item) => (
                    <li className="item-hb" key={item.id}>
                        <div
                            className="item-hb__header"
                            onClick={() => handleClickPicker(item.id, false)}
                        >
                            <div className="item-left__header">
                                <Link to={config.routes.personPage}>
                                    <Image
                                        src={item.avatar}
                                        alt="avatar"
                                        className="left__avt"
                                    />
                                </Link>
                                <Link
                                    to={config.routes.personPage}
                                    className="left__username"
                                >
                                    {item.username}
                                </Link>
                                <p className="left__date">{item.date}</p>
                            </div>

                            <div className="item-right__header">
                                <MoreHorizIcon
                                    className="right__icon-more"
                                    onClick={() => handleClickBtnMore(item.id)}
                                />
                            </div>
                        </div>

                        <div
                            className="item-hb__list-image "
                            onClick={() => handleClickPicker(item.id, false)}
                        >
                            {arrayImg[item.id]?.index > 0 ? (
                                <p
                                    className="icon-wrap-left"
                                    onClick={() =>
                                        handleClickPrevImage(item.id)
                                    }
                                >
                                    <KeyboardArrowLeftIcon className="icon" />
                                </p>
                            ) : (
                                ''
                            )}

                            <Image
                                src={arrayImg[item.id]?.url}
                                alt="picture"
                                className="image"
                            />

                            {arrayImg[item.id]?.index <
                            item?.posts?.length - 1 ? (
                                <p
                                    className="icon-wrap-right"
                                    onClick={() =>
                                        handleClickNextImage(item.id)
                                    }
                                >
                                    <KeyboardArrowRightIcon className="icon" />
                                </p>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="item-hb__contact">
                            <div
                                className="contact__row-1"
                                onClick={() =>
                                    handleClickPicker(item.id, false)
                                }
                            >
                                {listInfo[item.id - 1]?.status === true ? (
                                    <FavoriteOutlinedIcon
                                        className="active-heart"
                                        onClick={() =>
                                            handleClickBtnLike(item.id)
                                        }
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        className="row-1__icon none-active-heart"
                                        onClick={() =>
                                            handleClickBtnLike(item.id)
                                        }
                                    />
                                )}

                                <FaRegCommentAlt
                                    className="row-1__icon"
                                    onClick={() => handClickBtnCmt(item.id)}
                                />
                                <BsShare
                                    className="row-1__icon"
                                    onClick={() =>
                                        handleClickPicker(item.id, false)
                                    }
                                />
                            </div>
                            <div
                                className="contact__likes"
                                onClick={() =>
                                    handleClickPicker(item.id, false)
                                }
                            >
                                14.000
                            </div>
                            <div
                                className="contact__row-2"
                                onClick={() =>
                                    handleClickPicker(item.id, false)
                                }
                            >
                                <ShowMoreText
                                    lines={2}
                                    more="Show more"
                                    less="Show less"
                                    className="content__text"
                                    anchorClass="show-more-less-clickable"
                                    expanded={false}
                                    truncatedEndingComponent={'...'}
                                >
                                    <Link to="#" className="row-2__un">
                                        {item.username}
                                    </Link>
                                    {item.caption}
                                </ShowMoreText>
                            </div>

                            <div className="contact__row-3">
                                <textarea
                                    value={listInfo[item.id - 1]?.content}
                                    ref={(el) => (ref.current[item.id] = el)}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    type="text"
                                    placeholder="Add your comment"
                                    className="row-3__input"
                                    onFocus={() =>
                                        handleClickPicker(item.id, false)
                                    }
                                    onChange={(e) =>
                                        handleInputChange(e, item.id)
                                    }
                                />
                                <div className="row-3__comment">
                                    <LuSmile
                                        className="row-3__smile-icon"
                                        onClick={() =>
                                            handleClickPicker(
                                                item.id,
                                                !listInfo[item.id - 1]?.icon,
                                            )
                                        }
                                    />
                                    <div
                                        className={
                                            listInfo[item.id - 1]?.icon
                                                ? 'd-block picker-wrap'
                                                : 'd-none picker-wrap'
                                        }
                                    >
                                        <Picker
                                            className="picker"
                                            data={data}
                                            previewPosition="none"
                                            onEmojiSelect={(e) => {
                                                let temp = [...listInfo];
                                                if (
                                                    listInfo[item.id - 1]
                                                        ?.content
                                                ) {
                                                    const value = listInfo[
                                                        item.id - 1
                                                    ]?.content.concat(e.native);
                                                    addValueForInput(
                                                        temp,
                                                        item,
                                                        value,
                                                    );
                                                } else {
                                                    const value =
                                                        e.native.concat(
                                                            listInfo[
                                                                item.id - 1
                                                            ]?.content,
                                                        );
                                                    addValueForInput(
                                                        temp,
                                                        item,
                                                        value,
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                {viewPort.width <= isXS ? (
                                    listInfo[item.id - 1]?.send ? (
                                        <p
                                            className="row-3__post"
                                            onClick={() => handlePostCmt()}
                                        >
                                            Post
                                        </p>
                                    ) : (
                                        <p className=" row-3__post post__disabled">
                                            Post
                                        </p>
                                    )
                                ) : listInfo[item.id - 1]?.send ? (
                                    <AiOutlineSend className="row-3__send-icon" />
                                ) : (
                                    <AiOutlineSend className="row-3__send-icon send-icon__disabled" />
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {showDialog ? (
                <div className="home__dialog">
                    <Dialog
                        open={showDialog}
                        onClose={() => setShowDialog(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="dialog__btn">
                            {followMode ? (
                                ''
                            ) : (
                                <button
                                    onClick={() => {
                                        setShowDialog(false);
                                        setCheckUnFollow(true);
                                    }}
                                    className="btn-dialog"
                                >
                                    Unfollow
                                </button>
                            )}
                            <button
                                onClick={() => setShowDialog(false)}
                                className="btn-dialog"
                                autoFocus
                            >
                                Share
                            </button>

                            <button
                                onClick={() => setShowDialog(false)}
                                className="btn-dialog"
                                autoFocus
                            >
                                Cancel
                            </button>
                        </div>
                    </Dialog>
                </div>
            ) : (
                ''
            )}

            {checkUnFollow ? (
                <div>
                    <Dialog
                        open={checkUnFollow}
                        onClose={() => setCheckUnFollow(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="dialog__userinfo">
                            <Image
                                className="dialog__userinfo-img"
                                src={userInfo ? userInfo.avatar : ''}
                            />
                            <p className="dialog__userinfo-text">
                                Unfollow
                                <b style={{ marginLeft: '4px' }}>
                                    {userInfo ? userInfo.username : ''}
                                </b>
                            </p>
                        </div>
                        <div className="dialog__btn">
                            <button
                                onClick={() => handleClickUnfollow()}
                                className="btn-dialog"
                                style={{ fontWeight: '600', color: '#ef3553' }}
                            >
                                Unfollow
                            </button>

                            <button
                                onClick={() => setCheckUnFollow(false)}
                                className="btn-dialog"
                                autoFocus
                            >
                                Cancel
                            </button>
                        </div>
                    </Dialog>
                </div>
            ) : (
                ''
            )}
        </>
    );
}
