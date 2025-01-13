

export const MENU =[
    {
        title: 'Home',
        path: '/home',
        exact: true,
        icon:"mdi-home",
        subMenu:[]
    },
    {
        title: 'Leads',
        path: '/lead',
        exact: true,
        icon:"mdi-user",
        subMenu:[]
    },
    {
        title: 'User',
        path: '/employee',
        exact: true,
        icon:"mdi-user",
        subMenu:[]
    },

    {
        title: 'Candidate',
        exact: true,
        icon:"mdi-user",
        subMenu:[
            {
                title: 'Candidate List',
                path: '/candidate',
                exact: true,
            },
            {
                title: 'Candidate Rank',
                path: '/candidate',
                exact: true,
            }
        ]
    },
    {
        title: 'Payment 2',
        exact: true,
        icon:"mdi-user",
        subMenu:[
            {
                title: 'Payment List',
                path: '/candidate',
                exact: true,
            },
            {
                title: 'Payment Suces',
                path: '/candidate',
                exact: true,
            }
        ]
    }
]