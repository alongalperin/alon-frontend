import { store } from "../../store/store";

const authGuard = (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
};

export default authGuard;
