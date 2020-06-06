import { FuseNavigation } from "../../@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "applications",
        title: "",
        type: "group",
        children: [
            {
                id: "empresa",
                title: "Empresas",
                type: "item",
                icon: "business",
                url: "/empresa"
            }
        ]
    },
    {
        id: "menu",
        title: "Menu",
        type: "group",
        icon: 'pages',
        children: [
            {
                id: "cadastro",
                title: "Cadastro",
                type: 'collapsable',
                icon: 'add_circle_outline',
                badge: {
                    title: '10',
                    bg: '#525e8a',
                    fg: '#FFFFFF'
                },
                children: [
                    {
                        id: 'agrupamento',
                        title: 'Agrupamento',
                        type: 'item',
                        url: '/cadastro/agrupamento'
                    }
                    // {
                    //     id: 'atributo',
                    //     title: 'Atributo',
                    //     type: 'item',
                    //     url: '/cadastro/atributo'
                    // }
                ]
            },
            {
                id: "arvore",
                title: "Árvore",
                type: 'item',
                icon: 'account_tree',
                url: '/arvore',
                badge: {
                    title: '10',
                    bg: '#525e8a',
                    fg: '#FFFFFF'
                }
            },

        ]
    },
    {
        id: "applications",
        title: "Configurações",
        // translate: "NAV.BASIC_ENTRIES",
        type: "group",
        children: [
            {
                id: "logout",
                title: "Deslogar",
                type: "item",
                icon: "settings",
                function: () => {
                    localStorage.clear();
                },
                url: "/auth/login"
            }
        ]
    }
];
