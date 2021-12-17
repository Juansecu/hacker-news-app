/* ------ Third-party libraries ------ */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* ------ Environments ------ */
import { environment } from '../../../environments/environment';

/* ------ Interfaces ------ */
import { NewsResponse } from 'src/app/news/typings/New';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  constructor(private readonly _HTTP_CLIENT: HttpClient) {}

  /**
   * Get news sorted by date.
   *
   * @param {string} query - Search query.
   * @param {number} page - Page number.
   * @returns NewsResponse
   */
  getNewsSortedByDate(query: string, page: number): Observable<NewsResponse> {
    return this._HTTP_CLIENT.get<NewsResponse>(
      `${environment.apiBaseUrl}/search_by_date?query=${query}&page=${page}`
    );
  }
}
