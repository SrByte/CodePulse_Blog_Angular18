import { Routes } from '@angular/router';
import { CategoryListComponent } from './feature/category/category-list/category-list.component';
import { AddCategoryComponent } from './feature/category/add-category/add-category.component';


export const routes: Routes = [
  {
    path:'admin/categories',
    component:CategoryListComponent
  },
  {
    path:'admin/categories/add',
    component:AddCategoryComponent
  }
];
