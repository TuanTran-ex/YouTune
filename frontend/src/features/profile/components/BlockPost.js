import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Modal } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import {
    selectDeleteMode,
    selectUpdateMode,
} from 'features/create/createPostSlice';
import { useEffect, useState } from 'react';
import { BsPostcard } from 'react-icons/bs';
import './BlockPost.scss';
import ModalPost from './ModalPost';

function BlockPost({ infoUpload, avatar, username }) {
    const isDeleteMode = useAppSelector(selectDeleteMode);
    const isUpdateMode = useAppSelector(selectUpdateMode);


    const [open, setOpen] = useState(
        sessionStorage.getItem('show_post') ? true : false,
    );
    const [idImage, setIdImage] = useState(0);
    const [listPosts, setListPosts] = useState([]);

    const handleOpen = (item) => {
        setOpen(true);
        sessionStorage.setItem('show_post', true);
        localStorage.setItem('id_image', listPosts.indexOf(item));
        setIdImage(listPosts.indexOf(item));
    };

    const handleClose = () => {
        setOpen(false);
        sessionStorage.removeItem('show_post');
        localStorage.removeItem('id_image');
        localStorage.removeItem('change_post');
    };

    useEffect(() => {
        if (infoUpload?.posts) {
            setListPosts([...infoUpload?.posts]);
        }
    }, [infoUpload]);

    const handleClickPrevPost = () => {
        localStorage.setItem('id_image', idImage - 1);
        localStorage.setItem('change_post', true);
        setIdImage(idImage - 1);
    };

    const handleClickNextPost = () => {
        localStorage.setItem('id_image', idImage + 1);
        localStorage.setItem('change_post', true);
        setIdImage(idImage + 1);
    };

    useEffect(() => {
        if (isDeleteMode || isUpdateMode) {
            handleClose();
        }
    }, [isDeleteMode, isUpdateMode]);

    return (
        <div className="post-container">
            <ul className="post__header-list ">
                <li className={'block-post__active item'}>
                    <BsPostcard className="icon" />
                    Posts
                </li>
                <li className="item">
                    <BsPostcard className="icon" />
                    Save
                </li>
                <li className="item">
                    <BsPostcard className="icon" />
                    Post
                </li>
            </ul>
            <div className="post__content">
                <ul className="post-list">
                    {listPosts?.length > 0
                        ? listPosts.map((item) => (
                              <li
                                  key={item.id}
                                  className="post"
                                  onClick={() => handleOpen(item)}
                              >
                                  {item?.uploads[0]?.type == 0 ? (
                                      <Image
                                          src={item?.uploads[0]?.url}
                                          alt="post picture"
                                          className="image-post"
                                      />
                                  ) : (
                                      <video
                                          className="videos-post"
                                          src={item?.uploads[0]?.url}
                                      ></video>
                                  )}
                                  <p className="overlay"></p>
                              </li>
                          ))
                        : ''}
                </ul>
            </div>
            {open ? (
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div>
                            {idImage > 0 ? (
                                <p
                                    className="item-icon item-icon--left"
                                    onClick={handleClickPrevPost}
                                >
                                    <KeyboardArrowLeftIcon className=" arrow-left" />
                                </p>
                            ) : (
                                ''
                            )}
                            <ModalPost
                                id={listPosts?.[idImage]?.id}
                                avatar={avatar}
                                username={username}
                                listUpload={listPosts?.[idImage]?.uploads}
                                content={listPosts?.[idImage]?.content}
                                time_posted={listPosts?.[idImage]?.created_at}
                            />
                            {idImage < listPosts?.length - 1 ? (
                                <p
                                    className="item-icon item-icon--right"
                                    onClick={handleClickNextPost}
                                >
                                    <KeyboardArrowRightIcon className="arrow-right" />
                                </p>
                            ) : (
                                ''
                            )}
                        </div>
                    </Modal>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default BlockPost;
