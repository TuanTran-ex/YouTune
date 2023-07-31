import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Dialog, Modal } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import {
    createPostActions,
    selectDeleteMode,
    selectUpdateMode,
} from 'features/create/createPostSlice';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuSmile } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ShowMoreText from 'react-show-more-text';
import { isXM } from 'utils/mediaResponse';
import './ModalPost.scss';

function ModalPost({ id, avatar, username, listUpload, content, time_posted }) {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const isDeleteMode = useAppSelector(selectDeleteMode);
    const isUpdateMode = useAppSelector(selectUpdateMode);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [isPickerEdit, setIsPickerEdit] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputValueEdit, setInputValueEdit] = useState('');
    const [likeState, setLikeState] = useState(false);
    const [showBtnPost, setShowBtnPost] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [done, setDone] = useState(false);
    const [idImage, setIdImage] = useState(0);
    const [idItemEd, setIdItemEd] = useState(0);

    const isChangePost = localStorage.getItem('change_post');

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

    //DELETE POST
    const handleDeletePost = () => {
        setDeleteMode(true);
        dispatch(createPostActions.deletePost(id));
    };

    useEffect(() => {
        if (isDeleteMode || isUpdateMode) window.location.reload();
    }, [isDeleteMode, isUpdateMode]);

    useEffect(() => {
        if (content !== undefined) setInputValueEdit(content);
    }, [content]);

    //EDIT POST
    const handInputEditChange = (e) => {
        setInputValueEdit(e.target.value);
        if (e.target.value.trim().length === 0) setDone(false);
        else setDone(true);
    };

    const handleEditPost = () => {
        dispatch(
            createPostActions.updatePost({
                id: id,
                content: inputValueEdit,
            }),
        );
    };

    const handleClickPrevImage = () => {
        setIdImage(idImage - 1);
        localStorage.removeItem('change_post');
    };

    const handleClickNextImage = () => {
        setIdImage(idImage + 1);
        localStorage.removeItem('change_post');
    };

    //HANDLE WHEN CLICK NEXT / PREV POST
    useEffect(() => {
        if (isChangePost) {
            setIdImage(0);
        }
    }, [isChangePost]);

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
                    {idImage > 0 ? (
                        <p
                            className="icon-wrap-left"
                            onClick={handleClickPrevImage}
                        >
                            <KeyboardArrowLeftIcon className="icon" />
                        </p>
                    ) : (
                        ''
                    )}

                    {listUpload?.[idImage]?.type === '0' ? (
                        <Image
                            src={listUpload?.[idImage]?.url}
                            alt="picture"
                            className="image"
                        />
                    ) : (
                        <video
                            className="videos-md"
                            controls
                            src={listUpload?.[idImage]?.url}
                        ></video>
                    )}
                    {idImage < listUpload?.length - 1 ? (
                        <p
                            className="icon-wrap-right"
                            onClick={handleClickNextImage}
                        >
                            <KeyboardArrowRightIcon className="icon" />
                        </p>
                    ) : (
                        ''
                    )}
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
                        <div className="quantity" style={{ fontWeight: '600' }}>
                            <Image
                                src="https://ichef.bbci.co.uk/images/ic/1280xn/p079cw5m.jpg"
                                className="avt"
                                alt="picture"
                            />
                            <p
                                className="like-by"
                                style={{ fontWeight: '400' }}
                            >
                                Liked by
                            </p>
                            <Link to="#" className="name-user-like">
                                Nguyen Nhat Linh
                            </Link>
                            <span
                                className="like-by"
                                style={{ fontWeight: '400', marginLeft: '6px' }}
                            >
                                and
                            </span>
                            <Link to="#" className="other-cmt">
                                <p>123333</p>
                            </Link>
                            other peoples
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
                                    if (inputValue)
                                        setInputValue(
                                            inputValue.concat(e.native),
                                        );
                                    else {
                                        setInputValue(
                                            e.native.concat(inputValue),
                                        );
                                    }
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
                            <button
                                className="btn-dialog"
                                onClick={() => {
                                    setEditMode(true);
                                }}
                            >
                                Edit
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

            {editMode ? (
                <div>
                    <Modal
                        open={editMode}
                        onClose={() => setEditMode(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="edit-block">
                            <div
                                className="edit__header"
                                onClick={() => setIsPickerEdit(false)}
                            >
                                <p
                                    className="canle"
                                    onClick={() => {
                                        setEditMode(false);
                                    }}
                                >
                                    Cancel
                                </p>
                                <p className="mode">Edit Mode</p>
                                <p
                                    className={done ? 'done' : 'done disabled'}
                                    onClick={handleEditPost}
                                >
                                    Done
                                </p>
                            </div>
                            <div className="edit__content">
                                <div
                                    className="left-content"
                                    onClick={() => setIsPickerEdit(false)}
                                >
                                    {idItemEd > 0 ? (
                                        <p
                                            className="arrow-left-ed"
                                            onClick={() => {
                                                setIdItemEd(idItemEd - 1);
                                            }}
                                        >
                                            <KeyboardArrowLeftIcon className="icon" />
                                        </p>
                                    ) : (
                                        ''
                                    )}

                                    {listUpload?.[idItemEd]?.url?.includes(
                                        'image',
                                    ) ? (
                                        <Image
                                            src={listUpload?.[idItemEd]?.url}
                                            className="image"
                                            alt="picture"
                                        />
                                    ) : (
                                        <video
                                            controls
                                            className="video-edit-bl"
                                            src={listUpload?.[idItemEd]?.url}
                                        ></video>
                                    )}
                                    {idItemEd < listUpload?.length - 1 ? (
                                        <p
                                            className="arrow-right-ed"
                                            onClick={() => {
                                                setIdItemEd(idItemEd + 1);
                                            }}
                                        >
                                            <KeyboardArrowRightIcon className="icon" />
                                        </p>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="right-content">
                                    <div
                                        className="header-content"
                                        onClick={() => setIsPickerEdit(false)}
                                    >
                                        <Image
                                            src={avatar}
                                            alt="avatar picture"
                                            className="avt-img"
                                        />
                                        <p>{username}</p>
                                    </div>
                                    <div className="body-content">
                                        <textarea
                                            value={inputValueEdit}
                                            className="edit__text-content"
                                            type="text"
                                            placeholder="Your caption"
                                            autoFocus
                                            onClick={() =>
                                                setIsPickerEdit(false)
                                            }
                                            onChange={(e) =>
                                                handInputEditChange(e)
                                            }
                                        />
                                        <div className="emoji-wrap-ed">
                                            <LuSmile
                                                className="smile-icon"
                                                onClick={() =>
                                                    setIsPickerEdit(
                                                        !isPickerEdit,
                                                    )
                                                }
                                            />
                                            <div
                                                className={
                                                    isPickerEdit
                                                        ? 'd-block picker-wrap'
                                                        : 'd-none picker-wrap'
                                                }
                                            >
                                                <Picker
                                                    className="picker"
                                                    data={data}
                                                    previewPosition="none"
                                                    onEmojiSelect={(e) => {
                                                        if (inputValueEdit)
                                                            setInputValueEdit(
                                                                inputValueEdit.concat(
                                                                    e.native,
                                                                ),
                                                            );
                                                        else {
                                                            setInputValueEdit(
                                                                e.native.concat(
                                                                    inputValueEdit,
                                                                ),
                                                            );
                                                        }
                                                        setDone(true);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default ModalPost;
