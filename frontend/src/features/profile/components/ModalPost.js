import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Dialog } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import {
    createPostActions,
    selectDeleteMode,
} from 'features/create/createPostSlice';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuSmile } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ShowMoreText from 'react-show-more-text';
import { isXM } from 'utils/mediaResponse';
import './ModalPost.scss';

function ModalPost({ id, avatar, username, image, content, time_posted }) {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const isDeleteMode = useAppSelector(selectDeleteMode);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [likeState, setLikeState] = useState(false);
    const [showBtnPost, setShowBtnPost] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

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

    const handleClickLike = () => {
        setLikeState(true);
    };

    //Focus input
    const handClickBtnCmt = () => {
        ref.current.focus();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.trim().length === 0) setShowBtnPost(false);
        else setShowBtnPost(true);
    };

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    const handleDeletePost = () => {
        setDeleteMode(true);
        dispatch(createPostActions.deletePost(id));
    };

    useEffect(() => {
        if (isDeleteMode === true) window.location.reload();
    }, [isDeleteMode]);

    return (
        <div className="modal-container">
            {viewPort.width <= isXM && (
                <div
                    className="header"
                    onClick={() => setIsPickerVisible(false)}
                >
                    <div className="header__left">
                        <Image
                            src={avatar}
                            alt="avatar picture"
                            className="avt-img"
                        />
                        <p className="username">{username}</p>
                    </div>
                    <div
                        className="header__right"
                        onClick={() => setShowDialog(true)}
                    >
                        <MoreHorizIcon className="more-horiz-icon" />
                    </div>
                </div>
            )}
            <div
                className="modal__left"
                onClick={() => setIsPickerVisible(false)}
            >
                <div className="img-wrap">
                    <p className="icon-wrap-left">
                        <KeyboardArrowLeftIcon className="icon" />
                    </p>
                    <Image src={image} alt="picture" className="image" />

                    <p className="icon-wrap-right">
                        <KeyboardArrowRightIcon className="icon" />
                    </p>
                </div>
            </div>
            <div className="modal__right">
                {viewPort.width > isXM && (
                    <div className="header">
                        <div className="header__left">
                            <Image
                                src={avatar}
                                alt="avatar picture"
                                className="avt-img"
                            />
                            <p className="username">{username}</p>
                        </div>
                        <div
                            className="header__right"
                            onClick={() => setShowDialog(true)}
                        >
                            <MoreHorizIcon className="more-horiz-icon" />
                        </div>
                    </div>
                )}
                <div className="content">
                    <div
                        className="content__row-1"
                        onClick={() => setIsPickerVisible(false)}
                    >
                        {viewPort.width > isXM && (
                            <div className="content__header">
                                <Image
                                    src={avatar}
                                    alt="avatar picture"
                                    className="avt-img"
                                />
                                <p className="username">{username}</p>
                            </div>
                        )}

                        <ShowMoreText
                            lines={viewPort.width > isXM ? 5 : 2}
                            more="Show more"
                            less="Show less"
                            className="content__text"
                            anchorClass="show-more-less-clickable"
                            expanded={false}
                            truncatedEndingComponent={'...'}
                        >
                            {content}
                        </ShowMoreText>
                    </div>

                    <div
                        className="content__interact"
                        onClick={() => setIsPickerVisible(false)}
                    >
                        <div className="icon-wrap">
                            {likeState ? (
                                <FavoriteOutlinedIcon
                                    className="active-heart"
                                    onClick={() => setLikeState(false)}
                                />
                            ) : (
                                <FavoriteBorderIcon
                                    className="heart-icon none-active-heart"
                                    onClick={handleClickLike}
                                />
                            )}
                            <FaRegCommentAlt
                                className="cmt-icon"
                                onClick={handClickBtnCmt}
                            />
                        </div>
                        <div className="quantity">
                            <Image
                                src="https://ichef.bbci.co.uk/images/ic/1280xn/p079cw5m.jpg"
                                className="avt"
                                alt="picture"
                            />
                            <p className="like-by">Liked by</p>
                            <Link to="#" className="name-user-like">
                                Nguyen Nhat Linh
                            </Link>
                            <span>and</span>
                            <Link to="#" className="other-cmt">
                                <p>123333</p> other peoples
                            </Link>
                        </div>
                        <div className="date">
                            <p className="day">{time_posted?.slice(0, 10)}</p>
                        </div>
                    </div>
                    <div className="comment">
                        <LuSmile
                            className="smile-icon"
                            onClick={() => setIsPickerVisible(!isPickerVisible)}
                        />
                        <div
                            className={
                                isPickerVisible
                                    ? 'd-block picker-wrap'
                                    : 'd-none picker-wrap'
                            }
                        >
                            <Picker
                                className="picker"
                                data={data}
                                previewPosition="none"
                                onEmojiSelect={(e) => {
                                    setShowBtnPost(true);
                                    setInputValue(inputValue.concat(e.native));
                                }}
                            />
                        </div>
                        <textarea
                            value={inputValue}
                            ref={ref}
                            type="text"
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="input-cmt"
                            placeholder="Comment"
                            onClick={() => setIsPickerVisible(false)}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {showBtnPost ? (
                            <p
                                className="post-cmt"
                                onClick={() => setIsPickerVisible(false)}
                            >
                                Post
                            </p>
                        ) : (
                            <p className="post-cmt disabled">Post</p>
                        )}
                    </div>
                </div>
            </div>

            {showDialog ? (
                <div className="dialog">
                    <Dialog
                        open={showDialog}
                        onClose={() => setShowDialog(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="dialog__btn">
                            <button
                                onClick={() => {
                                    setShowDialog(false);
                                    setDeleteMode(true);
                                }}
                                className="btn-dialog"
                            >
                                Delete
                            </button>
                            <button className="btn-dialog">Edit</button>
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

            {deleteMode ? (
                <div>
                    <Dialog
                        open={deleteMode}
                        onClose={() => setDeleteMode(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="dialog__header">
                            Delete post?
                            <p> Are you sure you want to delete this post? </p>
                        </div>
                        <div className="dialog__btn delete__btn">
                            <button
                                onClick={handleDeletePost}
                                className="btn-dialog"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteMode(false)}
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
        </div>
    );
}

export default ModalPost;
