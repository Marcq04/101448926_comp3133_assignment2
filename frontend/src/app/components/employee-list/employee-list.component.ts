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

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  private gql = inject(GraphQLService); // GraphQLService injected
  private router = inject(Router);
  employees: any[] = []; // Array to store employee data

  constructor() {}

  ngOnInit(): void {
    // Make the GraphQL request and handle the response
    this.gql.query(GET_EMPLOYEES).then((data: any) => {
      this.employees = data.getAllEmployees;
    }).catch(error => {
      console.error('Error fetching employees:', error);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
