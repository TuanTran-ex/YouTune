import { BsSearchHeart } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import './Header_MB.scss';
import config from '../../../config/index';

export function Header_MB() {
    return (
        <div className="header_mb-wrapper">
            <p className="header_mb-wrapper__logo">YouTune</p>
            <div className="header_mb-wrapper__icon-wrap">
                <Link to={config.routes.search}>
                    <BsSearchHeart className="search-icon" />
                </Link>
                <Link to={config.routes.notification}>
                    <IoIosNotificationsOutline className="notifi-icon" />
                </Link>
            </div>
        </div>
    );
}
