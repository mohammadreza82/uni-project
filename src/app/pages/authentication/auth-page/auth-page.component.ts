import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../../services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IAuthCredentials } from '../../../interfaces/interfaces';
import { MessageService } from '../../../services/message.service';
import { SharedModule } from "../../../shared/shared.module";
import { ModalService } from '../../../services/modal.service';
import { Observable, Observer } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-auth-page',
  imports: [NzIconModule, FormsModule, CommonModule, FormsModule, SharedModule, NzUploadModule,],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  isActive = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  LoginData: IAuthCredentials = {
    username: '',
    password: '',
  };
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: MessageService,
    private modal: ModalService,
  ) { }

  // Register
  registerForm = {
    username: '',
    password: '',
    email: '',
    profileimg: null as File | null
  };

  // Profile Pic 
  loading = false;
  avatarUrl?: string;

  onCustomFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.message.show('error', 'Only JPG or PNG files are allowed!');
      return;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      this.message.show('success', 'Image must be smaller than 5MB!');
      return;
    }

    this.loading = true;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarUrl = reader.result as string;
      this.registerForm.profileimg = file;
      this.loading = false;
    };
    reader.onerror = () => {
      this.message.show('error', 'Failed to upload image');
      this.loading = false;
    };
    reader.readAsDataURL(file);
  }

  removeAvatar(): void {
    this.avatarUrl = undefined;
    this.registerForm.profileimg = null;
  }

  // Open Profile Picture Modal
  addProfile() {
    this.modal.toggleModal('addProfilePicture');
  }
  
  // Save Profile Picture (when modal is confirmed)
  profilePicSave(confirmed: boolean) {
    if (confirmed && this.registerForm.profileimg) {
      this.message.show('success', 'Profile picture saved successfully!');
    }
  }

  // Submit Full Registration Form
// Submit Full Registration Form
submitRegisterForm(): void {
  const { username, password, email, profileimg } = this.registerForm;

  if (!username || !password || !email) {
    this.message.show('warning', 'Please complete all required fields!');
    return;
  }

  this.loading = true;

  // اگر تصویر انتخاب شده بود، به Base64 تبدیلش می‌کنیم
  if (profileimg) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;

      const payload = {
        username,
        password,
        email,
        profileimg: base64Image 
      };

      this.sendRegister(payload);
    };
    reader.readAsDataURL(profileimg);
  } else {
    const payload = { username, password, email };
    this.sendRegister(payload);
  }
}

private sendRegister(payload: any) {
  console.log('📤 Sending JSON:', payload);

  this.authService.register(payload).subscribe({
    next: (res) => {
      console.log('✅ Server response:', res);
      this.message.show('success', 'Registration successful!');
      this.loading = false;

      if (res.access && res.refresh) {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      }

      this.isActive = false;
      // this.toggleActive()
      // this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.log('❌ Error:', err);
      this.message.show('error', err.error?.detail || 'Registration failed');
      this.loading = false;
    },
  });
}



  // Login
  handleLogin() {
    this.isLoading = true;

    if (!this.LoginData.username || !this.LoginData.password) {
      this.message.show('warning', 'Please enter username and password');
      this.isLoading = false;
      return;
    }

    this.authService.login(this.LoginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response) {
          console.log('Login successful, received response:', response);
          
          // ذخیره توکن‌ها
          if (response.access && response.refresh) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
          }
          
          this.message.show('success', 'Login successful!');
          this.router.navigate(['/dashboard']);
        }
      },
      error: err => {
        console.log(err);
        this.message.show('error', err.error?.detail || 'Login failed');
        this.isLoading = false;
      }
    });
  }
}