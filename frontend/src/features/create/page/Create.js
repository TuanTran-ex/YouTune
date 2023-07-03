import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, Dialog } from '@mui/material';
import Image from 'components/Image/Images';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import musicIcon from '../../../components/Image/musicIcon.png';
import { createPostActions } from '../createPostSlice';
import './Create.scss';

function Create({ avatar, username }) {
    const dispatch = useDispatch();

    const [image, setImage] = useState();
    const [indexImage, setIndexImage] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [listUpload, setListUpload] = useState([]);
    const [showBlockRightHand, setShowBlockRightHand] = useState(false);
    const [hideText, setHideText] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleUpload = (e) => {
        const file = e.target.files[0];
        let arrImgs = [];
        setImage(file);

        for (let item of e.target.files) {
            item.preview = URL.createObjectURL(item);
            arrImgs.push(item);
        }
        setListUpload(arrImgs);
    };

    useEffect(() => {
        const file = listUpload[indexImage];
        setImage(file);
    }, [listUpload, indexImage]);

    const handleClickOpenDialog = () => {
        setShowDialog(true);
    };

    const handleCloseDiaLog = () => {
        setShowDialog(false);
    };
    const handleBack = () => {
        setShowBlockRightHand(false);
    };

    const handleClickBtnDisagree = () => {
        setListUpload([]);
        setIndexImage(0);
        setShowDialog(false);
    };

    const handleClickBtnNext = () => {
        setShowBlockRightHand(true);
    };

    const handleHideText = (e) => {
        if (e.target.value === '') {
            setHideText(false);
        } else {
            setInputValue(e.target.value);
            setHideText(true);
        }
    };

    const handleClickBtnShare = () => {
        let type;
        if (image?.type.includes('video')) type = 1;
        else if (image?.type.includes('image')) type = 0;
        const content = inputValue;
        const formData = new FormData();
        formData.append('type', type);
        formData.append('file', image);
        formData.append('content', content);

        dispatch(createPostActions.createNewPost(formData));
    };

    return (
        <div className="create-block">
            <div
                className={
                    !showBlockRightHand
                        ? 'create__header'
                        : 'create__header create__header-fix'
                }
            >
                {image ? (
                    <div>
                        <KeyboardBackspaceIcon
                            className="back-icon"
                            onClick={
                                !showBlockRightHand
                                    ? handleClickOpenDialog
                                    : handleBack
                            }
                        />

                        <div className="dialog-wrap">
                            <Dialog
                                open={showDialog}
                                onClose={handleCloseDiaLog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <div className="dialog__header">
                                    <span>Discard post?</span>
                                    <p>
                                        If you leave, your edits won't be saved.
                                    </p>
                                </div>
                                <div className="dialog__btn">
                                    <button
                                        onClick={handleClickBtnDisagree}
                                        className="btn-disagree"
                                    >
                                        <p>Disagree</p>
                                    </button>
                                    <button
                                        onClick={handleCloseDiaLog}
                                        className="btn-cancel"
                                        autoFocus
                                    >
                                        <p>Cancel</p>
                                    </button>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <p className="text">Create new post</p>
                {image ? (
                    !showBlockRightHand ? (
                        <p className="text-next" onClick={handleClickBtnNext}>
                            Next
                        </p>
                    ) : (
                        <p className="text-next" onClick={handleClickBtnShare}>
                            Share
                        </p>
                    )
                ) : (
                    ''
                )}
            </div>

            <div
                className={
                    !showBlockRightHand
                        ? 'create__content'
                        : 'create__content create__full-content'
                }
            >
                {image ? (
                    <div
                        className={
                            !showBlockRightHand
                                ? 'img-wrap'
                                : 'img-wrap img-fix'
                        }
                    >
                        {indexImage < 1 ? (
                            ''
                        ) : (
                            <p
                                className="icon-wrap-left"
                                onClick={() => setIndexImage(indexImage - 1)}
                            >
                                <KeyboardArrowLeftIcon className="icon arrow-left" />
                            </p>
                        )}
                        {image?.type?.includes('image') ? (
                            <Image
                                src={image.preview}
                                alt="image upload"
                                className={
                                    showBlockRightHand
                                        ? 'border-none picture-upload'
                                        : 'picture-upload'
                                }
                            />
                        ) : image?.type?.includes('video') ? (
                            <video
                                className={
                                    showBlockRightHand
                                        ? 'border-none videos'
                                        : 'videos'
                                }
                                controls
                                autoPlay
                                src={image.preview}
                            ></video>
                        ) : (
                            ''
                        )}

                        {indexImage + 1 >= listUpload?.length ? (
                            ''
                        ) : (
                            <p
                                className="icon-wrap-right"
                                onClick={() => setIndexImage(indexImage + 1)}
                            >
                                <KeyboardArrowRightIcon className="icon arrow-right" />
                            </p>
                        )}
                    </div>
                ) : (
                    <Image
                        src={musicIcon}
                        alt="music-icon"
                        className="music-icon"
                    />
                )}

                {image ? (
                    ''
                ) : (
                    <div>
                        <Button className="select" component="label">
                            <p>S</p>elect your photo or music
                            <input
                                type="file"
                                hidden
                                onChange={(e) => handleUpload(e)}
                                multiple
                                required
                            />
                        </Button>
                    </div>
                )}
                {showBlockRightHand ? (
                    <div className="right-content">
                        <div className="right__header">
                            <Image
                                src={avatar}
                                alt="avatar picture"
                                className="avt-img"
                            />
                            <p className="username">{username}</p>
                        </div>
                        <div className="right__caption">
                            {hideText ? (
                                ''
                            ) : (
                                <p className="text">Write your caption...</p>
                            )}

                            <textarea
                                autoFocus
                                className="input-caption"
                                onChange={(e) => handleHideText(e)}
                            ></textarea>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default Create;
