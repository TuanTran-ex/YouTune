export const routes = {
    login: '/login',
    register: '/register',
    logout: '/logout',
    home: '/',
    profile: '/profile',
    uploadProfile: '/profile/upload',
    changePassword: '/profile/change-password',
    message: '/message',
    search: '/search',
    listMusic: '/list-music',
    notification: '/notification',
};

export const apiRoutes = {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    profile: '/auth/profile',
    city: '/cities',
    upload: '/uploads',
    changePassword: 'auth/profile/password',
    message: 'auth/message',
    posts: '/posts',
    refreshToken: '/auth/refresh',
    users: 'users',
};
export default routes;
