import ClearIcon from '@mui/icons-material/Clear';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import {
    searchActions,
    selectLoading,
    selectResult,
} from 'features/search/searchSlice';
import { useEffect, useRef, useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.scss';
import thumbnail from '../../Image/thumbnail.png';

export function Header() {
    const ref = useRef(null);
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const listSearchResult = useAppSelector(selectResult);
    const loading = useAppSelector(selectLoading);

    const [listResult, setListResult] = useState(listSearchResult);
    const [inputValue, setInputValue] = useState('');
    const [searchResultBlock, setSearchResultBlock] = useState(false);
    const [fullWidth, setFullWidth] = useState(false);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSearchResultBlock(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
        setListResult(listSearchResult);
    }, [listSearchResult]);

    const handleClearInputValue = () => {
        setInputValue('');
        ref.current.focus();
        setSearchResultBlock(false);
        setFullWidth(false);
    };

    const handleRemoveItem = (id) => {
        if (listResult?.length > 0) {
            const listClone = [...listResult];
            listClone.splice(id, 1);
            setListResult(listClone);
        }
    };

    const handleSearchUserInfo = (e) => {
        dispatch(searchActions.searchUserInfo(e.target.value));
        setFullWidth(true);
        setSearchResultBlock(true);
        setInputValue(e.target.value);
    };

    const handleFocusSearchInput = () => {
        setFullWidth(true);
    };

    return (
        <div className="header-wrapper">
            {fullWidth ? (
                ''
            ) : (
                <span
                    className="header-wrapper__logo"
                    onClick={() => setSearchResultBlock(false)}
                >
                    YouTune
                </span>
            )}

            <div
                className={fullWidth ? 'search-item full-width' : 'search-item'}
            >
                <input
                    ref={ref}
                    value={inputValue || ''}
                    onFocus={() => handleFocusSearchInput()}
                    type="text"
                    className="search-item__input"
                    placeholder="Search"
                    onChange={(e) => handleSearchUserInfo(e)}
                />
                {inputValue?.length > 0 ? (
                    <div className="search-item__clear">
                        <ClearIcon
                            className="search-item__clear-icon"
                            onClick={() => handleClearInputValue()}
                        />
                    </div>
                ) : (
                    <BsSearchHeart className="search-item__search-icon" />
                )}
                {searchResultBlock ? (
                    <div className="result-block">
                        {listResult?.length > 0 && loading === false ? (
                            <div>
                                <p
                                    className="result-block__clear-all"
                                    onClick={() => {
                                        setListResult([]);
                                    }}
                                >
                                    Clear all
                                </p>
                                <ul className="list-result-rs" ref={wrapperRef}>
                                    {listResult.map((item, index) => (
                                        <li
                                            className="item-result-rs"
                                            key={item.id}
                                        >
                                            <Link to="/">
                                                <Image
                                                    src={
                                                        item?.upload?.url
                                                            ? item?.upload?.url
                                                            : thumbnail
                                                    }
                                                    alt="avatar"
                                                    className="item-result__image"
                                                />
                                                <div className="item-result__un">
                                                    <p className="item-result__un-username">
                                                        {item?.username}
                                                    </p>
                                                    <p className="item-result__un-fullname">
                                                        {item?.full_name}
                                                    </p>
                                                </div>

                                                <ClearIcon
                                                    className="item-result__clear-icon"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleRemoveItem(index);
                                                    }}
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : listResult?.length === 0 && loading === false ? (
                            <p className="no-result">Không tìm thấy kết quả</p>
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    ''
                )}
            </div>
            {fullWidth ? (
                ''
            ) : (
                <IoIosNotificationsOutline
                    onClick={() => setSearchResultBlock(false)}
                    className="header__wrapper-notification"
                />
            )}
        </div>
    );
}
