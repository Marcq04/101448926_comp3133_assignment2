import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from '../../services/graphql.service';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  first_name = '';
  last_name = '';
  email = '';
  designation = '';
  department = '';
  salary!: number;

  constructor(private gql: GraphQLService, private router: Router) {}

  addEmployee() {
    const ADD_EMPLOYEE_MUTATION = `
      mutation AddEmployee(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $designation: String!,
        $department: String!,
        $salary: Float!
      ) {
        addEmployee(
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          designation: $designation,
          department: $department,
          salary: $salary
        ) {
          id
          first_name
          last_name
        }
      }
    `;

    const variables = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      designation: this.designation,
      department: this.department,
      salary: this.salary
    };

    this.gql.mutate(ADD_EMPLOYEE_MUTATION, variables)
      .then(response => {
        console.log('Employee added:', response);
        this.router.navigate(['/employees-list']);
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  }

  goBack() {
    this.router.navigate(['/employees-list']);
  }
}
