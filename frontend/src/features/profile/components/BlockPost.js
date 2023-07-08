import Image from 'components/Image/Images';
import { BsPostcard } from 'react-icons/bs';
import './BlockPost.scss';
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import ModalPost from './ModalPost';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function BlockPost({ infoUpload, avatar, username }) {
    const [onMode, setOnMode] = useState(true);
    const [open, setOpen] = useState(
        localStorage.getItem('show_post') ? true : false,
    );
    const [idImage, setIdImage] = useState(0);
    const [listPosts, setListPosts] = useState([]);

    const handleOpen = (item) => {
        setOpen(true);
        localStorage.setItem('show_post', true);
        localStorage.setItem('id_image', listPosts.indexOf(item));
        setIdImage(listPosts.indexOf(item));
    };

    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('show_post');
        localStorage.removeItem('id_image');
    };

    useEffect(() => {
        if (infoUpload?.posts) {
            setListPosts([...infoUpload?.posts].reverse());
        }
    }, [infoUpload]);

    const handleClickPrevPost = () => {
        localStorage.setItem('id_image', idImage - 1);
        setIdImage(idImage - 1);
    };

    const handleClickNextPost = () => {
        localStorage.setItem('id_image', idImage + 1);
        setIdImage(idImage + 1);
    };

    return (
        <div className="post-container">
            <ul className="post__header-list ">
                <li className={onMode ? 'block-post__active item' : 'item'}>
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
                                  <Image
                                      src={item?.upload?.url}
                                      alt="post picture"
                                      className="image-post"
                                  />
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
                                <KeyboardArrowLeftIcon
                                    className="item-icon arrow-left"
                                    onClick={handleClickPrevPost}
                                />
                            ) : (
                                ''
                            )}
                            <ModalPost
                                avatar={avatar}
                                username={username}
                                image={listPosts?.[idImage]?.upload?.url}
                                content={listPosts?.[idImage]?.content}
                                time_posted={listPosts?.[idImage]?.created_at}
                            />
                            {idImage < listPosts?.length - 1 ? (
                                <KeyboardArrowRightIcon
                                    className="item-icon arrow-right"
                                    onClick={handleClickNextPost}
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    </Modal>
                </div>
            ) : (
                ''
            )}
            <footer className="footer">@ From Uyen Tran & Tuan Tran</footer>
        </div>
    );
}

export default BlockPost;
