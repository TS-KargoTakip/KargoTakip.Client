import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "",
        loadComponent: () => import("./layout/layout.component"),
        children: [
            {
                path: "",
                loadComponent: () => import("./pages/home/home.component")
            },
            {
                path: "kargolar",
                children: [
                    {
                        path: "",
                        loadComponent: () => import("./pages/kargolar/kargolar.component")
                    },
                    {
                        path: "ekle",
                        loadComponent: () => import("./pages/kargolar/create/create-kargo.component")
                    }
                ]                
            }
        ]
    }
];
