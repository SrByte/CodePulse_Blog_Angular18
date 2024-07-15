import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { MarkdownModule } from 'ngx-markdown';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MarkdownModule
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit, OnDestroy {

  url: string | null = null;
  blogPost$?: Observable<BlogPost>;

  constructor(private router: ActivatedRoute,
    private blogPostService: BlogPostService
  ) { }

  ngOnInit(): void {

    this.router.paramMap
      .subscribe({
        next: (params) => {
          this.url = params.get('url');
        }
      })

    //Fetch detail by url
    if (this.url) {

      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);

    }

  }

  ngOnDestroy(): void {

  }

}
