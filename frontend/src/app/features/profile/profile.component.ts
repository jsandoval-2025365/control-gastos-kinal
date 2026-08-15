import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="container">
      <h2>Mi perfil</h2>
      @if (auth.currentUser(); as user) {
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Rol:</strong> {{ user.role }}</p>
        <p><strong>Creado:</strong> {{ user.createdAt | date: "medium" }}</p>
      }
      @if (auth.isAdmin()) {
        <p><a routerLink="/admin">Ir al panel de administración</a></p>
      }
      <button (click)="onLogout()">Cerrar sesión</button>
    </div>
  `,
})
export class ProfileComponent {
  constructor(public auth: AuthService, private router: Router) {}

  onLogout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(["/login"]),
      error: () => this.router.navigate(["/login"]),
    });
  }
}
