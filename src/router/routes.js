import LoginComponent from "../components/LoginComponent";
import WelcomeComponent from "../components/WelcomeComponent";
import UserInfoComponent from "../components/UserInfoComponent";

const routes = [
  { path: "/", component: WelcomeComponent },
  { path: "/login", component: LoginComponent },
  { path: "/user", component: UserInfoComponent },
];

export default routes;
