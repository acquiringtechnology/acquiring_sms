const routers = [
  {
    component: "AuthorizationLayout",
    path: "/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "WhoIAmPage",
        path: "/",
        auth: false,
        exact: true,
      },
      {
        component: "TrainerLoginPage",
        path: "/trainerLogin",
        auth: false,
        exact: true,
      },
      {
        component: "CandidateLoginPage",
        path: "/candidateLogin",
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: "AdminLayout",
    path: "/home",
    auth: true,
    exact: false,
    childrens: [
      {
        component: "HomePage",
        path: "/",
        auth: true,
        exact: true,
      },
    ],
  },

  {
    component: "AdminLayout",
    path: "/lead",
    auth: true,
    exact: false,
    childrens: [
      {
        component: "LeadPage",
        path: "/",
        auth: true,
        exact: true,
      },
    ],
  },

  {
    component: "AdminLayout",
    path: "/employee",
    auth: true,
    exact: false,
    childrens: [
      {
        component: "EmployeePage",
        path: "/",
        auth: true,
        exact: true,
      },
    ],
  },
  {
    component: "AdminLayout",
    path: "/batch",
    auth: true,
    exact: false,
    childrens: [
      {
        component: "BatchPage",
        path: "/",
        auth: true,
        exact: true,
      },
      {
        component: "BatchDetail",
        path: "detail/:batchId",
        auth: true,
        exact: true,
      },
    ],
  },
  {
    component: "AdminLayout",
    path: "/class",
    auth: true,
    exact: false,
    childrens: [
      {
        component: "SessionclassListPage",
        path: "/",
        auth: true,
        exact: true,
      },
      {
        component: "SessionclassDetailPage",
        path: "detail/:batchId",
        auth: true,
        exact: true,
      },
    ],
  },
  {
    component: "AdminLayout",
    path: "/atQuiz",
    auth: true,
    exact: false,
    childrens: [
      {
        component: "AtQuizPage",
        path: "/",
        auth: true,
        exact: true,
      }
    ],
  },
  {
    component: "AdminLayout",
    path: "/candidate",
    auth: true,
    exact: false,
    childrens: [
      {
        component: "CandidatePage",
        path: "/",
        auth: true,
        exact: true,
      },
      {
        component: "CandidateDetailPage",
        path: "/detail/:candidateId",
        auth: true,
        exact: true,
      },
    ],
  },
  {
    component: "AdminLayout",
    path: "/profile",
    auth: true,
    exact: false,
    childrens: [
      {
        component: "ProfilePage",
        path: "/",
        auth: true,
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
