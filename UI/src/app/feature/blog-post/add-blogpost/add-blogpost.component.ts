import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';
import { response } from 'express';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [RouterModule,
    FormsModule,
    CommonModule,
    MarkdownModule,
    ImageSelectorComponent

  ],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  categories$?: Observable<Category[]>
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;

  imageSelectorSubscription?: Subscription;
  blogPostServiceSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectorSubscription = this.imageService.onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          this.model.featuredImageUrl = selectedImage.url;
          this.closeImageSelector();
        }
      })

  }

  onFormSubmit(): void {
    this.blogPostServiceSubscription = this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.blogPostServiceSubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }

}

