import { TestBed } from '@angular/core/testing';

import { GraphQLService } from './graphql.service';

describe('GraphqlService', () => {
  let service: GraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
