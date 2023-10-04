import Image from 'components/Image';
import './AddFriend.scss';
import { useEffect, useState } from 'react';

function AddFriend() {
    const [arrayBtn, setArrayBtn] = useState([]);
    const listSuggest = [
        {
            id: 1,
            avt: 'https://cce.edu.vn/wp-content/uploads/2023/06/hinh-anh-hoat-hinh-de-thuong-1-600x600.jpg',
            username: 'rintran',
            name: 'Rin',
            reference: 'uyentran.152',
        },
        {
            id: 8,
            avt: 'https://haycafe.vn/wp-content/uploads/2021/12/Hinh-anh-hoat-hinh-de-thuong-cute-dep-nhat.jpeg',
            username: 'andrew.TanKhuong',
            name: 'Nguyen Tan Khuong',
            reference: '',
        },

        {
            id: 3,
            avt: 'https://bookvexe.vn/wp-content/uploads/2023/04/tong-hop-25-anh-hoat-hinh-cute-dang-yeu-nhat_1.jpg',
            username: 'rintran',
            name: 'Rin',
            reference: 'uyentran.152',
        },
        {
            id: 4,
            avt: 'https://mamnongautruc.edu.vn/hinh-anh-hoat-hinh-dep-de-thuong/imager_54211.jpg',
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
        <div className="addfriend">
            <p className="addfriend__text">Friend suggestion</p>
            <ul className="addfriend__list-suggest">
                {listSuggest.map((item, index) => (
                    <li className="list-suggest__item" key={item.id}>
                        <div className="list-suggest__item--left">
                            <Image
                                src={item.avt}
                                alt="avt-picture"
                                className="item__avt"
                            />
                            <div className="item__name-reference">
                                <p className="item__name-reference--username">
                                    {item.username}
                                </p>
                                <p className="item__name-reference--name">
                                    {item.name}
                                </p>

                                {item.reference === '' ? (
                                    <p className="item__name-reference--related">
                                        Suggest for you
                                    </p>
                                ) : (
                                    <span className="item__name-reference--related">
                                        Friend of <p>{item.reference}</p>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="list-suggest__item--right">
                            <button
                                className={
                                    arrayBtn?.[index]?.isActive
                                        ? 'add cancel-request'
                                        : 'add btn-add'
                                }
                                onClick={() => handleClickBtnFollow(index)}
                            >
                                {arrayBtn?.[index]?.isActive
                                    ? 'Cancel request '
                                    : 'Add friend'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddFriend;
