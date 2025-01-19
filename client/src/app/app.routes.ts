import { CanMatchFn, Router, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { inject } from '@angular/core';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shoudGetAccess = Math.random();
    if(shoudGetAccess > 0.5) {
        return true;
    }
    return router.createUrlTree(['/unauthorized']);
};

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: MainPageComponent,
        // canMatch: [dummyCanMatch]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: 'users/:userId',
        component: TasksComponent
    }
];
