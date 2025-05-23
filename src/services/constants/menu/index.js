import {LOGIN_TYPE} from '../flags'

export const MENU = [
  {
    title: "Home",
    path: "/home",
    exact: true,
    icon: "mdi-home",
    loginType:LOGIN_TYPE.BOTH,
    subMenu: [],
  },
  {
    title: "Leads",
    path: "/lead",
    exact: true,
    icon: "mdi-table-account",
    loginType:LOGIN_TYPE.EMPLOYEE,
    subMenu: [],
  },
  {
    title: "Employee",
    path: "/employee",
    exact: true,
    icon: "mdi-badge-account",
    loginType:LOGIN_TYPE.EMPLOYEE,
    subMenu: [],
  },

  {
    title: "Batch",
    path: "/batch",
    exact: true,
    icon: "mdi-group",
    loginType:LOGIN_TYPE.EMPLOYEE,
    subMenu: [],
  },

  {
    title: "Candidate",
    exact: true,
    icon: "mdi-account-group",
    loginType:LOGIN_TYPE.EMPLOYEE,
    path: "/candidate",
    subMenu: [],
  },

  {
    title: "class",
    loginType:LOGIN_TYPE.CANDIDATE,
    exact: true,
    icon: "mdi-book-open-blank-variant",
    path: "/class",
    subMenu: [],
  },
  {
    title: "My Profile",
    exact: true,
    icon: "mdi-account",
    loginType:LOGIN_TYPE.CANDIDATE,
    path: "/profile",
    subMenu: [],
  },
  {
    title: "AT Quiz",
    exact: true,
    icon: "mdi-lightning-bolt",
    loginType:LOGIN_TYPE.CANDIDATE,
    path: "/atQuiz",
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
  // {
  //   title: "Invoice",
  //   exact: true,
  //   icon: "mdi-invoice",
  //   loginType:LOGIN_TYPE.EMPLOYEE,
  //   path: "/invoice",
  //   subMenu: [],
  // },
  {
    title: "Accounts",
    exact: true,
    icon: "mdi-account-cash",
    loginType:LOGIN_TYPE.EMPLOYEE,
    subMenu: [
      {
        title: "Invoice",
        path: "/invoice",
        exact: true,
      },
      {
        title: "cash expenses",
        path: "/accounts/cashExpenses",
        exact: true,
      },
    ],
  },
  // {
  //   title: "Payment 2",
  //   exact: true,
  //   icon: "mdi-user",
  //   loginType:LOGIN_TYPE.EMPLOYEE,
  //   subMenu: [
  //     {
  //       title: "Payment List",
  //       path: "/candidate",
  //       exact: true,
  //     },
  //     {
  //       title: "Payment Suces",
  //       path: "/candidate",
  //       exact: true,
  //     },
  //   ],
  // },
];
