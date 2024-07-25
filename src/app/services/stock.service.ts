import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GithubApi } from '../model/GithubApi';
import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class StockHttpDatabase {
  private readonly GITHUB_API_URL = 'https://api.github.com/search/issues';

  constructor(private http: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const requestUrl = `${this.GITHUB_API_URL}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}&per_page=10`;

    return this.http.get<GithubApi>(requestUrl);
  }
}
