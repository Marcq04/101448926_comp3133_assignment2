import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from '../../services/graphql.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private graphQLService: GraphQLService, private router: Router) {}

  login() {
    const LOGIN_QUERY = `
      query LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
          user {
            id
            username
            email
          }
        }
      }
    `;

    this.graphQLService.query(LOGIN_QUERY, {
      email: this.email,
      password: this.password
    })
    .then(response => {
      const loginUser = response?.loginUser;

      if (loginUser && loginUser.token) {
        console.log('Login successful', loginUser);
        localStorage.setItem('token', loginUser.token);
        this.router.navigate(['/employees-list']);
      }
      else {
        console.error('Login failed: loginUser is missing or invalid', response);
      }
    })
    .catch(error => {
      console.error('Login failed', error);
      // handle login failure (e.g., show error message)
    })
  }
}
