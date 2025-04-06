import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphQLService } from '../../services/graphql.service';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId: string = '';
  employee: any = {
    first_name: '',
    last_name: '',
    email: '',
    designation: '',
    department: '',
    salary: null,
  };
  loading: boolean = true;
  error: string = '';

  constructor(private route: ActivatedRoute, private gql: GraphQLService, private router: Router) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.fetchEmployeeDetails();
  }

  fetchEmployeeDetails() {
    const GET_EMPLOYEE_BY_ID = `
      query GetEmployeeById($id: ID!) {
        getEmployeeById(id: $id) {
          id
          first_name
          last_name
          email
          designation
          department
          salary
        }
      }
    `;

    this.gql.query(GET_EMPLOYEE_BY_ID, { id: this.employeeId })
      .then(response => {
        this.employee = response.getEmployeeById;
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Failed to fetch employee details';
        this.loading = false;
      });
  }

  updateEmployee() {
    const UPDATE_EMPLOYEE_MUTATION = `
      mutation UpdateEmployee(
        $id: ID!,
        $first_name: String,
        $last_name: String,
        $email: String,
        $designation: String,
        $department: String,
        $salary: Float!
      ) {
        updateEmployee(
          id: $id,
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
          email
          designation
          department
          salary
        }
      }
    `;

    const variables = {
      id: this.employeeId,
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email,
      designation: this.employee.designation,
      department: this.employee.department,
      salary: this.employee.salary,
    };

    this.gql.mutate(UPDATE_EMPLOYEE_MUTATION, variables)
      .then(response => {
        console.log('Employee updated:', response);
        this.router.navigate(['/employees-list']);
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  }

  goBack() {
    this.router.navigate(['/employees-list']);
  }
}
