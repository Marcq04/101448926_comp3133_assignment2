import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  private apiUrl = 'https://one01448926-comp3133-assignment2.onrender.com/graphql';

  // Function to get the JWT token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  async query(query: string, variables?: Record<string, any>): Promise<any> {
    try {
      const token = this.getAuthToken();

      const response = await axios.post(this.apiUrl, {
        query,
        variables,
      }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      return response.data.data;
    } catch (error: any) {
      console.error('GraphQL query error:', error.response?.data || error.message);
      throw error;
    }
  }

  async mutate(mutation: string, variables?: Record<string, any>): Promise<any> {
    try {
      const token = this.getAuthToken();

      const response = await axios.post(this.apiUrl, {
        query: mutation,
        variables,
      }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      return response.data.data;
    } catch (error: any) {
      console.error('GraphQL mutation error:', error.response?.data || error.message);
      throw error;
    }
  }
}
