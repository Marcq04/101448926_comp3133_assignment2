import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphQLService } from '../../services/graphql.service';

@Component({
  selector: 'app-employee-details',
  standalone: false,
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId: string = '';
  employeeDetails: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(private route: ActivatedRoute, private gql: GraphQLService) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!; // Get employee ID from URL
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
          created_at
          updated_at
        }
      }
    `;

    this.gql.query(GET_EMPLOYEE_BY_ID, { id: this.employeeId })
      .then(response => {
        this.employeeDetails = response.getEmployeeById;
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Failed to fetch employee details';
        this.loading = false;
      });
  }

  goBack() {
    window.history.back();
  }  
}
