import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';


@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})

export class BlogpostListComponent implements OnInit, OnDestroy {

  blogPosts$?: Observable<BlogPost[]>;
  getAllBlogPostsSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService) {

  }

  ngOnInit(): void {
    this.getAllBlogPostsSubscription = this.blogPostService.getAllBlogPosts()
      .subscribe({
        next: (blogPosts: BlogPost[]) => {
          this.blogPosts$ = new Observable<BlogPost[]>(subscriber => {
            subscriber.next(blogPosts);
            subscriber.complete();
          });
          console.log('Lista de posts do blog:', blogPosts);
          // Aqui você pode adicionar lógica adicional para manipular os posts do blog, se necessário
        },
        error: (err) => {

          console.error('Ocorreu um erro ao obter os posts do blog:', err);

        },
        complete: () => {

          console.log('Obtenção dos posts do blog concluída com sucesso');

        }
      });
  }
  ngOnDestroy(): void {

    this.getAllBlogPostsSubscription?.unsubscribe();

  }

}

