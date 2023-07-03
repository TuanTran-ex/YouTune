import Image from 'components/Image/Images';
import { BsPostcard } from 'react-icons/bs';
import './BlockPost.scss';
import { useState } from 'react';
import { Modal } from '@mui/material';
import ModalPost from './ModalPost';

function BlockPost({ avatar, username, data }) {
    const [onMode, setOnMode] = useState(true);
    const [open, setOpen] = useState(
        localStorage.getItem('show_post') ? true : false,
    );

    const handleOpen = () => {
        setOpen(true);
        localStorage.setItem('show_post', true);
    };

    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('show_post');
    };

    const userInfo = data;
    console.log(userInfo);

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
                    <li className="post" onClick={handleOpen}>
                        <Image
                            src="https://i.pinimg.com/originals/92/98/d3/9298d3930ebcf5436611d91d4cda2b0a.jpg"
                            alt="post picture"
                            className="image-post"
                        />
                        <p className="overlay"></p>
                    </li>

                    <li className="post">
                        <Image
                            src="https://e0.pxfuel.com/wallpapers/970/432/desktop-wallpaper-awesome-beautiful-lit-aesthetic-pinterest-nature-thumbnail.jpg"
                            alt="post picture"
                            className="image-post"
                        />
                        <p className="overlay"></p>
                    </li>
                    <li className="post">
                        <Image
                            src="https://e0.pxfuel.com/wallpapers/970/432/desktop-wallpaper-awesome-beautiful-lit-aesthetic-pinterest-nature-thumbnail.jpg"
                            alt="post picture"
                            className="image-post"
                        />
                    </li>

                    <li className="post">
                        <Image
                            src="https://i.pinimg.com/originals/92/98/d3/9298d3930ebcf5436611d91d4cda2b0a.jpg"
                            alt="post picture"
                            className="image-post"
                        />
                        <p className="overlay"></p>
                    </li>
                    <li className="post">
                        <Image
                            src="https://e0.pxfuel.com/wallpapers/970/432/desktop-wallpaper-awesome-beautiful-lit-aesthetic-pinterest-nature-thumbnail.jpg"
                            alt="post picture"
                            className="image-post"
                        />
                    </li>
                    <li className="post">
                        <Image
                            src="https://e0.pxfuel.com/wallpapers/970/432/desktop-wallpaper-awesome-beautiful-lit-aesthetic-pinterest-nature-thumbnail.jpg"
                            alt="post picture"
                            className="image-post"
                        />
                    </li>
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
                            <ModalPost
                                data={data}
                                avatar={avatar}
                                username={username}
                            />
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
