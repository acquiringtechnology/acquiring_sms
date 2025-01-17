const routers = [
  {
    component: "AdminLayout",
    path: "/home",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "HomePage",
        path: "/",
        auth: false,
        exact: true,
      },
    ],
  },

  {
    component: "AdminLayout",
    path: "/lead",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "LeadPage",
        path: "/",
        auth: false,
        exact: true,
      },
    ],
  },

  {
    component: "AdminLayout",
    path: "/user",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "UserPage",
        path: "/",
        auth: false,
        exact: true,
      },
      {
        component: "UserDetailPage",
        path: "/detail",
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: "PageNotFoundPage",
    path: "*",
    auth: false,
    exact: false,
   
  },
];

export default routers;
