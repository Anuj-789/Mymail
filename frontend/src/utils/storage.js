const ACCESS_TOKEN = "accessToken";

export const storage = {
  setToken(token) {
    localStorage.setItem(ACCESS_TOKEN, token);
  },

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  },

  removeToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  },

  clear() {
    localStorage.clear();
  },
};