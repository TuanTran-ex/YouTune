export const routes = {
    login: '/login',
    register: '/register',
    logout: '/logout',
    home: '/',
    profile: '/profile',
    uploadProfile: '/profile/upload',
    changePassword: '/profile/changepassword',
    message: '/message',
    listMusic: '/listmusic',
};

export const apiRoutes = {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    profile: '/auth/profile',
    city: '/cities',
    upload: '/uploads',
    changePassword: '/changepassword',
    message: 'auth/message',
};
export default routes;
