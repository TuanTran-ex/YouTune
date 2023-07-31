import ClearIcon from '@mui/icons-material/Clear';
import { useAppSelector } from 'app/hooks';
import Image from 'components/Image/Images';
import React, { useEffect, useRef, useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { isXS } from 'utils/mediaResponse';
import thumbnail from '../../../components/Image/thumbnail.png';
import { searchActions, selectLoading, selectResult } from '../searchSlice';
import './Search.scss';

function Search() {
    const ref = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const listSearchResult = useAppSelector(selectResult);
    const loading = useAppSelector(selectLoading);
    const [listResult, setListResult] = useState(listSearchResult);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setListResult(listSearchResult);
    }, [listSearchResult]);

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
    const viewPort = useViewport();

    useEffect(() => {
        if (viewPort.width > isXS) {
            history.push('/');
        }
    }, [viewPort.width]);

    const handleClearInputvalue = () => {
        setInputValue('');
        ref.current.focus();
        setListResult([]);
    };

    const handleRemoveItem = (id) => {
        const listClone = [...listResult];
        listClone.splice(id, 1);
        setListResult(listClone);
    };
    const handleSearchUserInfo = (e) => {
        dispatch(searchActions.searchUserInfo(e.target.value));
        setInputValue(e.target.value);
    };

    return (
        <div className="ft-search">
            <div className="ft-search__header">
                <input
                    ref={ref}
                    value={inputValue || ''}
                    className="header__input"
                    name="search-input"
                    onChange={(e) => handleSearchUserInfo(e)}
                />

                {inputValue?.length > 0 ? (
                    <div className="header__clear">
                        <ClearIcon
                            className="header__clear-icon"
                            onClick={() => handleClearInputvalue()}
                        />
                    </div>
                ) : (
                    <BsSearchHeart className="header__search-icon" />
                )}
            </div>
            {listResult?.length > 0 && loading === false ? (
                <div className="ft-search__body">
                    <div className="ft-search__body-rb result-block">
                        <p
                            className="result-block__clear-all"
                            onClick={() => {
                                setListResult([]);
                            }}
                        >
                            Clear all
                        </p>

                        <ul className="list-result-fts list-result-rs">
                            {listResult.map((item, index) => (
                                <li
                                    className="item-result-fts item-result-rs"
                                    key={item.id}
                                >
                                    <Link to="/">
                                        <Image
                                            src={
                                                item.upload?.url
                                                    ? item?.upload.url
                                                    : thumbnail
                                            }
                                            alt="avatar"
                                            className="item-result__image"
                                        />
                                        <div className="item-result__un">
                                            <p className="item-result__un-username">
                                                {item.username}
                                            </p>
                                            <p className="item-result__un-fullname">
                                                {item.full_name}
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
                </div>
            ) : inputValue?.length > 0 && loading === false ? (
                <p className="no-result" style={{ marginTop: '40px' }}>
                    Không tìm thấy kết quả
                </p>
            ) : (
                ''
            )}
        </div>
    );
}

export default Search;
