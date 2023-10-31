import ChangePassword from 'features/profile/page/ChangePassword';
import ProfilePage from 'features/profile/page/ProfilePage';
import UploadProfilePage from 'features/profile/page/UploadProfilePage';
import Search from 'features/search/page/Search';
import config from '../config';
import PersonPage from 'features/personPage/Personpage';

const publicRoutes = [];

const privateRoutes = [
    {
        path: config.routes.profile,
        component: ProfilePage,
    },
    { path: config.routes.uploadProfile, component: UploadProfilePage },
    { path: config.routes.changePassword, component: ChangePassword },
    { path: config.routes.search, component: Search },
    { path: config.routes.personPage + '/:id', component: PersonPage },
];

export { privateRoutes, publicRoutes };
