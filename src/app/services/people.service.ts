import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from '../models/people.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  // Assuming your API URL is the base for posts (adjust if needed)
  baseUrl = 'http://localhost:5000/person';

  constructor(private http: HttpClient) {}

  // Get all people
  getPeoples(): Observable<People[]> {
    return this.http.get<People[]>(this.baseUrl);
  }

  // Add a new person
  postPeople(people: People): Observable<People> {
    return this.http.post<People>(this.baseUrl, people);
  }

  // Delete a person (id as number, matching the model)
  deletePeople(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
