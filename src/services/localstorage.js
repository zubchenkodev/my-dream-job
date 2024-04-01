export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};
  
export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
        try {
            const user = JSON.parse(userString);
            return user;
        } catch (error) {
            console.error("Error parsing user from local storage:", error);
        }
    }
    return null;
}