import { Routes } from '@angular/router';
import { CategoryListComponent } from './feature/category/category-list/category-list.component';
import { AddCategoryComponent } from './feature/category/add-category/add-category.component';
import { EditCategoryComponent } from './feature/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './feature/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './feature/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './feature/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './feature/public/home/home.component';
import { BlogDetailsComponent } from './feature/public/blog-details/blog-details.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { authGuard } from './feature/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'blog/:url',
    component:BlogDetailsComponent
  },
  {
    path:'admin/categories',
    component:CategoryListComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/categories/add',
    component:AddCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/categories/:id',
    component:EditCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path: 'admin/blogposts',
    component:BlogpostListComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/blogposts/add',
    component:AddBlogpostComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/blogposts/:id',
    component:EditBlogpostComponent,
    canActivate:[authGuard]
  }
];
