import ProfilePage from 'features/profile/page/ProfilePage';
import UploadProfilePage from 'features/profile/page/UploadProfilePage';
import config from '../config';

const publicRoutes = [];

const privateRoutes = [
    {
        path: config.routes.profile,
        component: ProfilePage,
    },
    { path: config.routes.uploadProfile, component: UploadProfilePage },
];

export { privateRoutes, publicRoutes };
