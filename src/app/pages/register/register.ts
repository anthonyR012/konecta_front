import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error: string | null = null;
  
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  submit(){
    if(this.form.invalid || this.loading) return;
    this.loading = true; 
    this.error = null;
    const { name, email , password, confirmPassword } = this.form.getRawValue();

    if(password !== confirmPassword){
      this.loading = false;
      this.error = "Las contrasenas no coinciden";
      return;
    }

    this.auth.register({ email: email!, password: password!, name: name! }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? "No se pudo iniciar sesión";
      }
    });
  }
}
