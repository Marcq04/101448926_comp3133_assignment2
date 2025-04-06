import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from '../../services/graphql.service';

const GET_EMPLOYEES = `
  query {
    getAllEmployees {
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

const DELETE_EMPLOYEE = `
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;


@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  private gql = inject(GraphQLService);
  private router = inject(Router);
  employees: any[] = [];

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'designation',
    'department',
    'actions',
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.gql.query(GET_EMPLOYEES)
      .then((data: any) => {
        this.employees = data.getAllEmployees;
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employee-details', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/update-employee', id]);
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.gql.mutate(DELETE_EMPLOYEE, { id: String(id) })
        .then((res) => {
          console.log('Delete success:', res);
          this.loadEmployees(); // Refresh list after deletion
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
        });
    }
  }  

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
