import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./core/components/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, Navbar]
})
export class AppComponent {
  title = 'codepulse';
}
