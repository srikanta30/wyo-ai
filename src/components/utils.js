export const isLoggedIn = () => {
    return localStorage.getItem('authStatus');
};