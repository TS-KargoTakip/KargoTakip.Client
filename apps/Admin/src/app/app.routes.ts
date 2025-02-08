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
                loadComponent: () => import("./pages/kargolar/kargolar.component")
            }
        ]
    }
];
