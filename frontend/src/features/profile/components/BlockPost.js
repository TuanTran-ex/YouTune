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
        localStorage.getItem('show_post') ? true : false,
    );
    const [idImage, setIdImage] = useState(0);
    const [listPosts, setListPosts] = useState([]);

    const handleOpen = (item) => {
        setOpen(true);
        localStorage.setItem('show_post', true);
        // localStorage.setItem('id_image', listPosts.indexOf(item));
        // setIdImage(listPosts.indexOf(item));
        localStorage.setItem('id_image', listImage.indexOf(item));
        setIdImage(listImage.indexOf(item));
    };

    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('show_post');
        localStorage.removeItem('id_image');
        localStorage.removeItem('change_post');
    };

    useEffect(() => {
        if (infoUpload?.posts) {
            setListPosts([...infoUpload?.posts].reverse());
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

    const listImage = [
        {
            id: 1,
            array: [
                {
                    id: 2,
                    src: 'https://vapa.vn/wp-content/uploads/2022/12/anh-hoa-huong-duong-dep.jpeg',
                },

                {
                    id: 3,
                    src: 'https://inkythuatso.com/uploads/thumbnails/800/2022/05/1-hinh-nen-hoa-cuc-hoa-mi-inkythuatso-11-11-04-05.jpg',
                },
                {
                    id: 4,
                    src: 'https://kynguyenlamdep.com/wp-content/uploads/2019/12/hinh-anh-hoa-hong-dep-va-y-nghia.jpg',
                },
                {
                    id: 5,
                    src: 'https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-hoa-tulip-001.jpg',
                },

                {
                    id: 6,
                    src: 'https://inkythuatso.com/uploads/thumbnails/800/2022/05/1-hinh-nen-hoa-cuc-hoa-mi-inkythuatso-11-11-04-05.jpg',
                },
                {
                    id: 7,
                    src: 'https://anhdep123.com/wp-content/uploads/2021/03/anh-hoa-tulip-dep.jpg',
                },
            ],
        },
        {
            id: 2,
            array: [
                {
                    id: 5,
                    src: 'https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-hoa-tulip-001.jpg',
                },

                {
                    id: 6,
                    src: 'https://inkythuatso.com/uploads/thumbnails/800/2022/05/1-hinh-nen-hoa-cuc-hoa-mi-inkythuatso-11-11-04-05.jpg',
                },
                {
                    id: 7,
                    src: 'https://anhdep123.com/wp-content/uploads/2021/03/anh-hoa-tulip-dep.jpg',
                },
            ],
        },

        {
            id: 3,
            array: [
                {
                    id: 8,
                    src: 'https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-hoa-tulip-001.jpg',
                },
            ],
        },
        {
            id: 4,
            array: [
                {
                    id: 9,
                    src: 'https://thuthuatnhanh.com/wp-content/uploads/2022/06/Anh-chill-hoa.jpg',
                },
            ],
        },
    ];

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
                    {/* {listPosts?.length > 0
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
                        : ''} */}

                    {listImage.map((item) => (
                        <li
                            key={item.id}
                            className="post"
                            onClick={() => handleOpen(item)}
                        >
                            <Image
                                src={item.array[0].src}
                                alt="post picture"
                                className="image-post"
                            />
                            <p className="overlay"></p>
                        </li>
                    ))}
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
                                id={listPosts?.[idImage]?.id}
                                avatar={avatar}
                                username={username}
                                // image={listPosts?.[idImage]?.upload?.url}
                                image={listImage[idImage]}
                                content={listPosts?.[idImage]?.content}
                                time_posted={listPosts?.[idImage]?.created_at}
                            />
                            {/* idImage < listPosts?.length - 1 */}
                            {idImage < listImage.length - 1 ? (
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
