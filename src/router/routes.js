import LoginComponent from "../components/LoginComponent";
import WelcomeComponent from "../components/WelcomeComponent";
import UserInfoComponent from "../components/UserInfoComponent";

import authGuard from "./guards/auth-guard";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: WelcomeComponent,
    beforeEnter: authGuard,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/user",
    component: UserInfoComponent,
    beforeEnter: authGuard,
  },
];

export default routes;
