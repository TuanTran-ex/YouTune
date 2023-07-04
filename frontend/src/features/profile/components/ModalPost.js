import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'components/Image/Images';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { LuSmile } from 'react-icons/lu';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './ModalPost.scss';

function ModalPost({ avatar, username }) {
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [likeState, setLikeState] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [elementHeight, setElementHeight] = useState(false);
    const ref = useRef(null);
    const divref = useRef(null);

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

    const handClickBtnCmt = () => {
        ref.current.focus();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleShowMoreText = () => {
        if (showContent === false) {
            setShowContent(true);
        } else setShowContent(false);
    };

    useLayoutEffect(() => {
        if (divref.current.offsetHeight > 40) {
            setElementHeight(true);
        } else {
            setElementHeight(false);
        }
    }, []);

    return (
        <div className="modal-container">
            {viewPort.width < 769 && (
                <div className="header">
                    <div className="header__left">
                        <Image
                            src={avatar}
                            alt="avatar picture"
                            className="avt-img"
                        />
                        <p className="username">{username}</p>
                    </div>
                    <div className="header__right">
                        <MoreHorizIcon className="more-horiz-icon" />
                    </div>
                </div>
            )}
            <div className="modal__left">
                <div className="img-wrap">
                    <p className="icon-wrap-left">
                        <KeyboardArrowLeftIcon className="icon" />
                    </p>
                    <Image
                        src="https://i.pinimg.com/750x/1a/17/63/1a1763084359670e24e6bc1697d29f93.jpg"
                        alt="picture"
                        className="image"
                    />
                    <p className="icon-wrap-right">
                        <KeyboardArrowRightIcon className="icon" />
                    </p>
                </div>
            </div>
            <div className="modal__right">
                {viewPort.width > 768 && (
                    <div className="header">
                        <div className="header__left">
                            <Image
                                src={avatar}
                                alt="avatar picture"
                                className="avt-img"
                            />
                            <p className="username">{username}</p>
                        </div>
                        <div className="header__right">
                            <MoreHorizIcon className="more-horiz-icon" />
                        </div>
                    </div>
                )}
                <div className="content">
                    <div className="content__row-1">
                        {viewPort.width > 768 && (
                            <div className="content__header">
                                <Image
                                    src={avatar}
                                    alt="avatar picture"
                                    className="avt-img"
                                />
                                <p className="username">{username}</p>
                            </div>
                        )}
                        <div>
                            <div
                                ref={divref}
                                className={
                                    showContent
                                        ? 'show-content'
                                        : 'content__text'
                                }
                            >
                                Hello Use event.target.value to get the input
                                field's value and update the state variable
                            </div>

                            {elementHeight
                                ? viewPort.width < 769 && (
                                      <p
                                          className="see-more"
                                          onClick={handleShowMoreText}
                                      >
                                          {showContent ? 'Hide' : 'See more'}
                                      </p>
                                  )
                                : ''}
                        </div>
                    </div>

                    <div className="content__interact">
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
                                Linh
                            </Link>
                            <span>and</span>
                            <Link to="#" className="other-cmt">
                                9 other peoples
                            </Link>
                        </div>
                        <div className="date">
                            <p className="month">May</p>
                            <p className="day">21</p>
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
                                    setInputValue(inputValue.concat(e.native));
                                }}
                            />
                        </div>

                        <textarea
                            value={inputValue}
                            ref={ref}
                            type="text"
                            className="input-cmt"
                            placeholder="Comment"
                            onChange={(e) => handleInputChange(e)}
                        />

                        <p
                            className={
                                inputValue ? 'post-cmt' : 'post-cmt disabled'
                            }
                        >
                            Post
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalPost;
