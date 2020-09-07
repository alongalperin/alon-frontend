const LoginComponent = () => {
  auditLoading("LoginComponent");
  return import(
    /* webpackChunkName: "group-LoginComponent" */ "../components/LoginComponent"
  );
};

const WelcomeComponent = () => {
  auditLoading("WelcomeComponent");
  return import(
    /* webpackChunkName: "group-WelcomeComponent" */ "../components/WelcomeComponent"
  );
};

const UserInfoComponent = () => {
  auditLoading("UserInfoComponent");
  return import(
    /* webpackChunkName: "group-UserInfoComponent" */ "../components/UserInfoComponent"
  );
};

function auditLoading(componentName) {
  console.log(`Lazy Loading: ${componentName}`);
}

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
