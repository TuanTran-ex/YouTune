import ProfilePage from 'features/profile/page/ProfilePage';
import UploadProfilePage from 'features/profile/page/UploadProfilePage';
import config from '../config';
import ChangePassword from 'features/profile/page/ChangePassword';

const publicRoutes = [];

const privateRoutes = [
    {
        path: config.routes.profile,
        component: ProfilePage,
    },
    { path: config.routes.uploadProfile, component: UploadProfilePage },
    { path: config.routes.changePassword, component: ChangePassword },
];

export { privateRoutes, publicRoutes };
