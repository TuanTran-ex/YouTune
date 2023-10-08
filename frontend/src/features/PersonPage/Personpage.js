import Image from 'components/Image';
import './PersonPage.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function PersonPage() {
    return (
        <div className="person-page">
            <div className="person-page__infomation">
                {/* 
                div : anh ben trai - thong itn theo doi ben phai 
                    ben phai: span(username, follow ) ; more icon
                div2: so bai viet; so nguoi theo doi, dang theo doi, 
                so ban be     
                div3: ten that, ten nhung ng lien quan dang theo doi; ket ban
                */}

                <p className="infomation__wrapper--left">
                    <Image
                        src="https://image-us.eva.vn/upload/3-2022/images/2022-08-12/image16-1660292012-472-width2048height1536.jpg"
                        alt="avatar"
                        className="left__avatar"
                    />
                </p>
                <section className="infomation__wrapper--right">
                    <div className="infomation__wrapper--row1">
                        <span className="row1__left">
                            <p className="row1__left--username">Suzy</p>
                            <button className="row1__left--follow">
                                Follow
                            </button>
                            <button className="row1__left--add">
                                Add Friend
                            </button>
                        </span>
                        <p className="row1__options">
                            <MoreHorizIcon className="row1__options--icon" />
                        </p>
                    </div>
                    <div className="infomation__wrapper--row2">
                        <p className="row2__posts">0 post</p>
                        <p className="row2__friends">42 friends</p>
                        <p className="row2__followers">42 follows</p>
                        <p className="row2__following">85 following</p>
                    </div>

                    <div className="infomation__wrapper--row3">
                        <p className="row3__fullname">Ho Thao Nguyen</p>
                    </div>

                    <div className="infomation__wrapper--row4">
                        Follow by
                        <ul className="row4__listfollowed">
                            <li className="listfollowed__item">cam.irinoco</li>
                        </ul>
                    </div>
                </section>
            </div>
            <div className="person-page__posts"></div>
        </div>
    );
}

export default PersonPage;
