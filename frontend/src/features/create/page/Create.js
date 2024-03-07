import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, Dialog } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import {
    profileActions,
    selectProfileData,
} from 'features/profile/profileSlice';
import { useEffect, useState } from 'react';
import { LuSmile } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import musicIcon from '../../../components/Image/musicIcon.png';
import { createPostActions } from '../createPostSlice';
import './Create.scss';

function Create() {
    const dispatch = useDispatch();
    const userProfile = useAppSelector(selectProfileData);

    const [image, setImage] = useState();
    const [avtImage, setAvtImage] = useState();
    const [indexImage, setIndexImage] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [listUpload, setListUpload] = useState([]);
    const [showBlockRightHand, setShowBlockRightHand] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    useEffect(() => {
        dispatch(profileActions.fetchProfileData());
    }, []);

    useEffect(() => {
        setAvtImage(userProfile?.upload?.url);
    }, [userProfile]);

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

    const handleWriteCaption = (e) => {
        setInputValue(e.target.value);
    };

    const handleClickBtnShare = () => {
        const content = inputValue;
        const formData = new FormData();
        for (let i = 0; i < listUpload?.length; i++) {
            formData.append(`files[${i}]`, listUpload[i]);
        }
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
                onClick={() => setIsPickerVisible(false)}
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
                        ? image?.type?.includes('audio')
                            ? 'audio-wrap'
                            : 'create__content'
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
                        onClick={() => setIsPickerVisible(false)}
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
                        <div
                            className="right__header"
                            onClick={() => setIsPickerVisible(false)}
                        >
                            <Image
                                src={avtImage}
                                alt="avatar picture"
                                className="avt-img"
                            />
                            <p className="username">{userProfile?.username}</p>
                        </div>
                        <div className="right__caption">
                            <textarea
                                value={inputValue}
                                autoFocus
                                type="text"
                                className="input-caption"
                                onClick={() => setIsPickerVisible(false)}
                                onChange={(e) => handleWriteCaption(e)}
                                placeholder="Write your caption"
                            ></textarea>

                            <div className="emoji-wrap-ed">
                                <LuSmile
                                    className="smile-icon"
                                    onClick={() =>
                                        setIsPickerVisible(!isPickerVisible)
                                    }
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
                            </div>
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
