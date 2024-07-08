import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { response } from 'express';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [RouterModule,
            FormsModule,
            CommonModule,
            MarkdownModule

  ],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent {
  model: AddBlogPost;

  constructor(private blogPostService: BlogPostService,
    private router: Router

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

  onFormSubmit(): void {
    this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
  }
}

