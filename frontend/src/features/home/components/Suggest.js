import { Box, Modal } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import { selectProfileData } from 'features/profile/profileSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { homeActions } from '../homeSlice';
import './Suggest.scss';

function Suggest({ title, listSuggest }) {
    const userProfile = useAppSelector(selectProfileData);
    const arraySuggest = listSuggest;

    const [arrayBtn, setArrayBtn] = useState([]);
    const [arrayBtn2, setArrayBtn2] = useState([]);
    const [listSuggestFriend, setListSuggestFriend] = useState([]);
    const [listBtnUnFriend, setListBtnUnfriend] = useState([]);
    const [users, setUsers] = useState();
    const [open, setOpen] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [first, setFirst] = useState();
    const [second, setSecond] = useState();
    const [listUser, setListUser] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpenModal2(true);
    const handleClose2 = () => setOpenModal2(false);

    const dispatch = useDispatch();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        //fetch List Suggest
        dispatch(homeActions.fetchSuggestFollow());
    }, []);

    useEffect(() => {
        let tam = [];
        let tam3 = [];
        for (let item of arraySuggest) {
            const getStatus = item?.requestFollowFriends?.[0]?.status
                ? item?.requestFollowFriends?.[0]?.status
                : false;
            tam.push({
                id: item.id,
                isActive: getStatus,
            });
            tam3.push({
                id: item.id,
                isActive: false,
            });
        }
        setArrayBtn(tam);

        //handle for render 4 next el of user list
        const listUserSlice = arraySuggest?.slice(0, 4);
        setListUser(listUserSlice);
        setListSuggestFriend(tam3);
        setUsers(arraySuggest);
    }, [arraySuggest]);

    const handleClickBtnFollow = (index, itemId) => {
        let params;
        let temp = [...arrayBtn];
        const getReceiver = listUser?.[index];

        const status = temp[index].isActive;
        if (!status) {
            params = {
                senderId: userProfile?.id,
                receiverId: itemId,
                status: 1,
                requestFollowFriends: getReceiver.requestFollowFriends,
            };
        } else {
            params = {
                senderId: userProfile?.id,
                receiverId: itemId,
                status: 0,
                requestFollowFriends: getReceiver.requestFollowFriends,
            };
        }
        temp[index].isActive = !temp[index].isActive;
        dispatch(homeActions.sendRequestToFollow(params));
        setArrayBtn(temp);
    };

    const handleClickBtnAddFriend = (index, itemId) => {
        let temp = [...listSuggestFriend];
        temp[index].isActive = !temp[index].isActive;
        setListSuggestFriend(temp);
    };

    //Handle array toggle btn 'unfollow' when click 'and more'
    const handleClickUnfollow = (name) => {
        let temp = [...arrayBtn2];
        const getItem = temp.filter((item) => item.name === name);
        temp[getItem[0].index].isActive = !temp[getItem[0].index].isActive;
        setArrayBtn2(temp);
    };

    //Handle array toggle btn 'unfriend' when click 'and more'
    const hanleClickBtnUnfriend = (name) => {
        let temp = [...listBtnUnFriend];
        const getItem = temp.filter((item) => item.name === name);
        if (!temp[getItem[0].index].isActive) {
            temp[getItem[0].index].isActive = !temp[getItem[0].index].isActive;
            setListBtnUnfriend(temp);
        }
    };

    //Handle toggle button add <=> cancel
    const hanleCancelRequest = (name) => {
        let temp = [...listBtnUnFriend];
        const getItem = temp.filter((item) => item.name === name);
        temp[getItem[0].index].isCancel = !temp[getItem[0].index].isCancel;
        setListBtnUnfriend(temp);
    };

    //To see all list followed
    const handleClickSeeMore = (id) => {
        handleOpen();
        let temp;
        let tam2 = [];
        if (users?.length > 0) {
            temp = users.filter((item) => item.id === id);
        }

        let i = 0;
        for (let item of temp[0]?.followers) {
            tam2.push({
                index: i,
                name: item.username,
                isActive: false,
            });
            i++;
        }
        setArrayBtn2(tam2);
        setFirst(temp[0]?.followers);
    };

    const handleClickSeeMoreFriend = (id) => {
        handleOpen2();
        let temp;
        let tam2 = [];
        if (users?.length > 0) {
            temp = users.filter((item) => item.id === id);
        }

        let i = 0;
        for (let item of temp[0]?.friends) {
            tam2.push({
                index: i,
                name: item.username,
                isActive: false,
                isCancel: false,
            });
            i++;
        }
        setListBtnUnfriend(tam2);
        setSecond(temp[0]?.friends);
    };

    const RenderListUser = () => {
        let cloneListUser = [...listUser];
        let size;
        if (users?.length >= 8) size = 8;
        else size = users?.length;

        for (let i = 4; i < size; i++) {
            const item = users.slice(i, i + 1);
            cloneListUser.push(item[0]);
        }

        setListUser(cloneListUser);
    };

    return (
        <div className="suggest-wrapper">
            <p className="suggest__text">{title}</p>
            <ul className="list-suggest">
                {(users?.length > 4 ? listUser : users)?.map((item, index) => (
                    <li className="item-suggest" key={item?.id}>
                        <div className="left-hand-sg">
                            <Image
                                src={item?.avatar}
                                alt="avt-picture"
                                className="avt-image"
                            />
                            <div className="name-reference">
                                <Link
                                    to={`/profile/${item.id}`}
                                    className="username"
                                >
                                    {item?.username}
                                </Link>
                                <p className="name">{item?.full_name}</p>
                                {title === 'Suggest for you' ? (
                                    item?.followers === undefined ||
                                    item?.followers?.length <= 0 ? (
                                        <p className="reference">
                                            Suggest for you
                                        </p>
                                    ) : (
                                        <span className="reference">
                                            <Link
                                                to={`/profile/${item?.followers[0]?.id}`}
                                                className="reference--followed"
                                            >
                                                {item?.followers[0]?.username}
                                            </Link>
                                            {item?.followers?.length > 1 ? (
                                                ', '
                                            ) : (
                                                <span
                                                    style={{
                                                        marginRight: '3px',
                                                    }}
                                                ></span>
                                            )}
                                            {item?.followers?.length >= 2 ? (
                                                <Link
                                                    to={`/profile/${item?.followers[1]?.id}`}
                                                    className="reference--followed"
                                                    style={{
                                                        display: 'inline',
                                                        margin: '0 3px',
                                                    }}
                                                >
                                                    {
                                                        item?.followers[1]
                                                            ?.username
                                                    }
                                                </Link>
                                            ) : (
                                                ''
                                            )}
                                            {item?.followers?.length > 2 ? (
                                                <span
                                                    style={{
                                                        display: 'inline',
                                                        marginRight: '3px',
                                                    }}
                                                    className="reference--more"
                                                    onClick={() =>
                                                        handleClickSeeMore(
                                                            item?.id,
                                                        )
                                                    }
                                                >
                                                    and more
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                            followed
                                        </span>
                                    )
                                ) : item?.friends?.length === 0 ? (
                                    <p className="reference">Suggest for you</p>
                                ) : (
                                    <span className="reference">
                                        Friend of
                                        <Link
                                            style={{ marginLeft: '3px' }}
                                            to="#"
                                            className="reference--followed"
                                        >
                                            {item?.friends[0]?.username}
                                        </Link>
                                        {item?.friends?.length > 1 && ', '}
                                        {item?.friends?.length >= 2 ? (
                                            <Link
                                                to="#"
                                                className="reference--followed"
                                                style={{
                                                    display: 'inline',
                                                    margin: '0 3px',
                                                }}
                                            >
                                                {item?.friends[1]?.username}
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                        {item?.friends?.length > 2 ? (
                                            <span
                                                className="reference--more"
                                                onClick={() =>
                                                    handleClickSeeMoreFriend(
                                                        item?.id,
                                                    )
                                                }
                                            >
                                                and more
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                        {title === 'Suggest for you' ? (
                            <div className="right-hand-sg">
                                <button
                                    className={
                                        arrayBtn?.[index]?.isActive
                                            ? 'follow un-followed'
                                            : 'follow btn-follow'
                                    }
                                    onClick={() =>
                                        handleClickBtnFollow(index, item.id)
                                    }
                                >
                                    {arrayBtn?.[index]?.isActive
                                        ? 'Unfollow'
                                        : 'Follow'}
                                </button>
                            </div>
                        ) : (
                            <div className="right-hand-sg">
                                <button
                                    className={
                                        listSuggestFriend?.[index]?.isActive
                                            ? 'add cancel-request'
                                            : 'add btn-add'
                                    }
                                    onClick={() =>
                                        handleClickBtnAddFriend(index, item.id)
                                    }
                                >
                                    {listSuggestFriend?.[index]?.isActive
                                        ? 'Cancel request'
                                        : 'Add friend'}
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {users?.length > 4 &&
            listUser?.length < 8 &&
            listUser?.length < users?.length ? (
                <p className="see-more" onClick={() => RenderListUser()}>
                    See more
                </p>
            ) : (
                ''
            )}

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-box">
                    <p className="modal-box__title">Follow by</p>
                    <ul className="modal-box__list">
                        {first?.map((item, index) => (
                            <li className="modal-box__item" key={index}>
                                <div>
                                    <Image
                                        src={item.avatar}
                                        alt="avatar"
                                        className="modal-box__item--avt"
                                    />
                                    <span>
                                        <Link
                                            to={`/profile/${item.id}`}
                                            className="modal-box__item--username"
                                        >
                                            {item.username}
                                        </Link>
                                        <p className="modal-box__item--fullname">
                                            {item.full_name}
                                        </p>
                                    </span>
                                </div>
                                <button
                                    className="modal-box__item--btn"
                                    onClick={() =>
                                        handleClickUnfollow(item.username)
                                    }
                                >
                                    {arrayBtn2?.[index]?.isActive
                                        ? 'Follow'
                                        : 'UnFollow'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Modal>

            {/* Modal to show list suggest friend */}
            <Modal
                open={openModal2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-box">
                    <p className="modal-box__title">Friend of</p>
                    <ul className="modal-box__list">
                        {second?.map((item, index) => (
                            <li className="modal-box__item" key={index}>
                                <div>
                                    <Image
                                        src={item.avatar}
                                        alt="avatar"
                                        className="modal-box__item--avt"
                                    />
                                    <span>
                                        <p className="modal-box__item--username">
                                            {item.username}
                                        </p>
                                        <p className="modal-box__item--fullname">
                                            {item.full_name}
                                        </p>
                                    </span>
                                </div>
                                {!listBtnUnFriend?.[index]?.isActive ? (
                                    <button
                                        //
                                        className="modal-box__item--btn-add"
                                        onClick={() =>
                                            hanleClickBtnUnfriend(item.username)
                                        }
                                    >
                                        {listBtnUnFriend?.[index]?.isActive
                                            ? 'Add friend'
                                            : 'Unfriend'}
                                    </button>
                                ) : (
                                    <button
                                        className={'modal-box__item--btn-add'}
                                        onClick={() =>
                                            hanleCancelRequest(item.username)
                                        }
                                    >
                                        {listBtnUnFriend?.[index]?.isCancel
                                            ? 'Cancel request'
                                            : 'Add friend'}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </Box>
            </Modal>
        </div>
    );
}

export default Suggest;
