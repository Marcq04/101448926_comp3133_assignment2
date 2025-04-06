import { inject, Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  private apiUrl = 'https://one01448926-comp3133-assignment2.onrender.com/graphql';

  async query(query: string, variables?: Record<string, any>): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, {
        query,
        variables,
      });

      return response.data.data;
    } catch (error: any) {
      console.error('GraphQL error:', error.response?.data || error.message);
      throw error;
    }
  }
}
