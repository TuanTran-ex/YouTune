import Image from 'components/Image/Images';
import { useEffect, useState } from 'react';
import './Suggest.scss';

function Suggest() {
    const [arrayBtn, setArrayBtn] = useState([]);
    const listSuggest = [
        {
            id: 1,
            avt: 'https://toigingiuvedep.vn/wp-content/uploads/2022/05/anh-chill-hoa-dao-tho-mong-1.jpg',
            username: 'rintran',
            name: 'Rin',
            reference: 'uyentran.152',
        },
        {
            id: 8,
            avt: 'https://img.thuthuatphanmem.vn/uploads/2018/09/25/hinh-anh-hoa-cuc-cau-vong-dep_110817989.jpg',
            username: 'andrew.TanKhuong',
            name: 'Nguyen Tan Khuong',
            reference: '',
        },

        {
            id: 3,
            avt: 'https://cdn.pixabay.com/photo/2018/03/01/06/59/flowers-3189883_1280.jpg',
            username: 'rintran',
            name: 'Rin',
            reference: 'uyentran.152',
        },
        {
            id: 4,
            avt: 'https://cdn.pixabay.com/photo/2018/03/06/20/44/the-most-beautiful-flower-3204543_1280.jpg',
            username: 'thuydung.122',
            name: 'Thuy Dung',
            reference: '',
        },
    ];

    useEffect(() => {
        let tam = [];
        for (let item of listSuggest) {
            tam.push({
                id: item.id,
                isActive: false,
            });
        }
        setArrayBtn(tam);
    }, []);

    const handleClickBtnFollow = (index) => {
        let temp = [...arrayBtn];
        temp[index].isActive = !temp[index].isActive;
        setArrayBtn(temp);
    };
    return (
        <div className="suggest-wrapper">
            <p className="suggest__text">Suggest for you</p>
            <ul className="list-suggest">
                {listSuggest.map((item, index) => (
                    <li className="item-suggest" key={item.id}>
                        <div className="left-hand-sg">
                            <Image
                                src={item.avt}
                                alt="avt-picture"
                                className="avt-image"
                            />
                            <div className="name-reference">
                                <p className="username">{item.username}</p>
                                <p className="name">{item.name}</p>

                                {item.reference === '' ? (
                                    <p className="reference">Suggest for you</p>
                                ) : (
                                    <span className="reference">
                                        Có <p>{item.reference}</p> theo dõi
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="right-hand-sg">
                            <button
                                className={
                                    arrayBtn?.[index]?.isActive
                                        ? 'follow un-followed'
                                        : 'follow btn-follow'
                                }
                                onClick={() => handleClickBtnFollow(index)}
                            >
                                {arrayBtn?.[index]?.isActive
                                    ? 'UnFollow'
                                    : 'Follow'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Suggest;
