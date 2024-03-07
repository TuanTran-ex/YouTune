import ClearIcon from '@mui/icons-material/Clear';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import {
    searchActions,
    selectLoading,
    selectResult,
} from 'features/search/searchSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import thumbnail from '../../Image/thumbnail.png';
import './Search.scss';

export function Search() {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const listSearchResult = useAppSelector(selectResult);
    const loading = useAppSelector(selectLoading);
    const [listResult, setListResult] = useState(listSearchResult);
    const [inputValue, setInputValue] = useState();

    useEffect(() => {
        setListResult(listSearchResult);
    }, [listSearchResult]);

    const handleRemoveItem = (id) => {
        if (listResult?.length > 0) {
            const listClone = [...listResult];
            listClone.splice(id, 1);
            setListResult(listClone);
        }
    };

    const handleClearAllItem = () => {
        setListResult([]);
    };

    const handleSearchUserInfo = (e) => {
        dispatch(searchActions.searchUserInfo(e.target.value));
        setInputValue(e.target.value);
    };

    const handleClearInputValue = () => {
        setInputValue('');
        ref.current.focus();
        setListResult([]);
    };

    return (
        <div className="search-wrap">
            <h2 className="search__title">Search</h2>
            <div className="search-bar">
                <input
                    ref={ref}
                    autoFocus
                    value={inputValue || ''}
                    type="text"
                    className="search-bar__input"
                    placeholder="Search"
                    onChange={(e) => handleSearchUserInfo(e)}
                />
                <p
                    className="search-bar__icon"
                    onClick={() => handleClearInputValue()}
                >
                    <ClearIcon className="search-bar__clear-icon" />
                </p>
            </div>
            {listResult?.length > 0 && loading === false ? (
                <div className="search-result">
                    <p
                        className="search-result__clear-all"
                        onClick={() => handleClearAllItem()}
                    >
                        Clear all
                    </p>

                    <ul className="list-result">
                        {listResult?.map((item, index) => (
                            <li className="item-result" key={item.id}>
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
    );
}
