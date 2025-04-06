import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from '../../services/graphql.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private graphQLService: GraphQLService, private router: Router) {}

  signup() {
    const SIGNUP_MUTATION = `
      mutation SignupUser($username: String!, $email: String!, $password: String!) {
        signupUser(username: $username, email: $email, password: $password) {
          token
          user {
            id
            username
            email
          }
        }
      }
    `;

    this.graphQLService.query(SIGNUP_MUTATION, {
      username: this.username,
      email: this.email,
      password: this.password
    })
    .then(response => {
      console.log('Signup successful', response);
      // handle successful signup (e.g., redirect to login or dashboard)
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.error('Signup failed', error);
      // handle signup failure (e.g., show error message)
      this.router.navigate(['/signup']);
    });
  }
}
