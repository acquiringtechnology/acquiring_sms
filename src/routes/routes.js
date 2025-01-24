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
    path: "/employee",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "EmployeePage",
        path: "/",
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: "AdminLayout",
    path: "/batch",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "BatchPage",
        path: "/",
        auth: false,
        exact: true,
      },
      {
        component: "BatchDetail",
        path: "detail/:batchId",
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: "AdminLayout",
    path: "/class",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "SessionclassListPage",
        path: "/",
        auth: false,
        exact: true,
      },
      {
        component: "SessionclassDetailPage",
        path: "detail/:classId",
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: "AdminLayout",
    path: "/candidate",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "CandidatePage",
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
