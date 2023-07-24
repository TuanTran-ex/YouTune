import ProfilePage from 'features/profile/page/ProfilePage';
import UploadProfilePage from 'features/profile/page/UploadProfilePage';
import config from '../config';
import ChangePassword from 'features/profile/page/ChangePassword';
import Test from 'features/test';
import Search from 'features/search/page/Search';

const publicRoutes = [];

const privateRoutes = [
    {
        path: config.routes.profile,
        component: ProfilePage,
    },
    { path: config.routes.uploadProfile, component: UploadProfilePage },
    { path: config.routes.changePassword, component: ChangePassword },
    { path: config.routes.search, component: Search },
    { path: config.routes.message, component: Test },
];

export { privateRoutes, publicRoutes };
