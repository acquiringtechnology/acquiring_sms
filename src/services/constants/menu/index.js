export const MENU = [
  {
    title: "Home",
    path: "/home",
    exact: true,
    icon: "mdi-home",
    subMenu: [],
  },
  {
    title: "Leads",
    path: "/lead",
    exact: true,
    icon: "mdi-table-account",
    subMenu: [],
  },
  {
    title: "Employee",
    path: "/employee",
    exact: true,
    icon: "mdi-badge-account",
    subMenu: [],
  },

  {
    title: "Batch",
    path: "/batch",
    exact: true,
    icon: "mdi-group",
    subMenu: [],
  },

  {
    title: "Candidate",
    exact: true,
    icon: "mdi-account-group",
    path: "/candidate",
    subMenu: [],
  },
  {
    title: "class",
    exact: true,
    icon: "mdi-book-open-blank-variant",
    path: "/class",
    subMenu: [],
  },
  // {
  //     title: 'Candidate',
  //     exact: true,
  //     icon:"mdi-user",
  //     subMenu:[
  //         {
  //             title: 'Candidate List',
  //             path: '/candidate',
  //             exact: true,
  //         },
  //         {
  //             title: 'Candidate Rank',
  //             path: '/candidate',
  //             exact: true,
  //         }
  //     ]
  // },
  {
    title: "Payment 2",
    exact: true,
    icon: "mdi-user",
    subMenu: [
      {
        title: "Payment List",
        path: "/candidate",
        exact: true,
      },
      {
        title: "Payment Suces",
        path: "/candidate",
        exact: true,
      },
    ],
  },
];
