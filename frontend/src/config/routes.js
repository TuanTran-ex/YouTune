export const routes = {
    login: '/login',
    register: '/register',
    logout: '/logout',
    home: '/',
    profile: '/profile',
    uploadProfile: '/profile/upload',
    changePassword: '/profile/change-password',
    message: '/message',
    listMusic: '/list-music',
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
    deletePost: '/posts/:id',
};
export default routes;
