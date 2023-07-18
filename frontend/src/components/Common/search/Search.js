import ClearIcon from '@mui/icons-material/Clear';
import Image from 'components/Image/Images';
import { useRef, useState } from 'react';
import './Search.scss';
function Search() {
    const listAccount = [
        {
            id: 1,
            url: 'https://vapa.vn/wp-content/uploads/2022/12/anh-hoa-huong-duong-dep.jpeg',
            un: 'embotmukbang',
            fullname: 'Minh Chau Nguyen Thi',
        },
        {
            id: 2,
            url: 'https://2.bp.blogspot.com/-YSvJZ2XolBo/W1WDT11IveI/AAAAAAAABeQ/APG2q44dplcclsfFs9JxzmYIlJBl3xXjQCLcBGAs/s640/anh-hoa-dep-nhat-the-gioi.jpg',
            un: 'emteumukbang',
            fullname: 'Nguyen Thi Anh1',
        },
        {
            id: 3,
            url: 'https://vapa.vn/wp-content/uploads/2022/12/anh-hoa-huong-duong-dep.jpeg',
            un: 'pamela Hai Duong',
            fullname: 'Nguyen Thi Anh Thu Le Anh Toan Nguyen Ngoc ',
        },

        {
            id: 4,
            url: 'https://2.bp.blogspot.com/-YSvJZ2XolBo/W1WDT11IveI/AAAAAAAABeQ/APG2q44dplcclsfFs9JxzmYIlJBl3xXjQCLcBGAs/s640/anh-hoa-dep-nhat-the-gioi.jpg',
            un: 'pamela Hai Duong',
            fullname: 'Pam Mat Vuong ',
        },

        {
            id: 5,
            url: 'https://vapa.vn/wp-content/uploads/2022/12/anh-hoa-huong-duong-dep.jpeg',
            un: 'embotmukbang',
            fullname: 'Minh Chau Nguyen Thi',
        },
        {
            id: 6,
            url: 'https://images.pexels.com/photos/39024/lotus-nature-plants-flowers-39024.jpeg?cs\u003dsrgb\u0026dl\u003dpexels-pixabay-39024.jpg\u0026fm\u003djpg',
            un: 'emteumukbang',
            fullname: 'Nguyen Thi Anh Thu Le Anh Toan Nguyen Ngoc ',
        },
        {
            id: 7,
            url: 'https://vapa.vn/wp-content/uploads/2022/12/anh-hoa-huong-duong-dep.jpeg',
            un: 'pamela Hai Duong',
            fullname: 'Nguyen Thi Anh Thu Le Anh Toan Nguyen Ngoc ',
        },
        {
            id: 15,
            url: 'https://images.pexels.com/photos/39024/lotus-nature-plants-flowers-39024.jpeg?cs\u003dsrgb\u0026dl\u003dpexels-pixabay-39024.jpg\u0026fm\u003djpg',
            un: 'embotmukbang',
            fullname: 'Nguyen Ngoc Anh',
        },
        {
            id: 16,
            url: 'https://vapa.vn/wp-content/uploads/2022/12/anh-hoa-huong-duong-dep.jpeg',
            un: 'emteumukbang',
            fullname: 'Le Thi Hoa Chi',
        },
        {
            id: 17,
            url: 'https://webnhiepanh.com/wp-content/uploads/2017/09/anthemideae-2612477_960_720.jpg',
            un: 'pamela Hai Duong',
            fullname: 'Nguyen Ngoc Toan',
        },
    ];
    const [listResult, setListResult] = useState(listAccount);
    const [inputValue, setInputValue] = useState();
    const ref = useRef(null);

    const handleRemoveItem = (id) => {
        const listClone = [...listResult];
        listClone.splice(id, 1);
        setListResult(listClone);
    };

    const handleClearAllItem = () => {
        setListResult([]);
    };
    return (
        <div className="search-wrap">
            <h2 className="search__title">Search</h2>
            <div className="search-bar">
                <input
                    ref={ref}
                    autoFocus
                    value={inputValue}
                    type="text"
                    className="search-bar__input"
                    placeholder="Search"
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                />
                <p
                    className="search-bar__icon"
                    onClick={() => {
                        setInputValue('');
                        ref.current.focus();
                    }}
                >
                    <ClearIcon className="search-bar__clear-icon" />
                </p>
            </div>
            <div className="search-result">
                <p
                    className="search-result__clear-all"
                    onClick={() => handleClearAllItem()}
                >
                    Clear all
                </p>

                <p className="search-result__recenly">Recen</p>
                <ul className="list-result">
                    {listResult.map((item, index) => (
                        <li className="item-result" key={item.id}>
                            <Image
                                src={item.url}
                                alt="avatar"
                                className="item-result__image"
                            />
                            <div className="item-result__un">
                                <p className="item-result__un-username">
                                    {item.un}
                                </p>
                                <p className="item-result__un-fullname">
                                    {item.fullname}
                                </p>
                            </div>

                            <ClearIcon
                                className="item-result__clear-icon"
                                onClick={() => handleRemoveItem(index)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;
