import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    Swal.fire({
      title: 'Please wait...',
      allowOutsideClick: false,
      icon: 'info',
    });
    Swal.showLoading();
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/customer/group']);
        Swal.close();
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
