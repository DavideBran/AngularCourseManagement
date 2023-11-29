import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseComponent } from './course/course.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { ItemsComponent } from './items/items.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { costumerGuard } from './costumer.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'Course',
        component: CourseComponent,
        canActivate: [costumerGuard],
        children: [
            { path: '', component: LaboratoryComponent },
            { path: 'Items', component: ItemsComponent },
            { path: 'Administrator', component: AdministratorComponent },
        ]
    }
];
