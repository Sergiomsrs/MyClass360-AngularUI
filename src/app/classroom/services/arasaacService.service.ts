import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArasaacResponse } from '../interfaces/rest-arasaacResponse.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'https://api.arasaac.org/v1/pictograms';


@Injectable({
  providedIn: 'root'
})
export class ArasaacServiceService {

  private http = inject(HttpClient);

  searchByKeyWords(query: string): Observable<ArasaacResponse[]> {
    query = query.toLowerCase();
    return this.http.get<ArasaacResponse[]>(`${API_URL}/es/search/${query}`).pipe(
      tap(resp => console.log(resp)),
      catchError((error) => {
        console.error('Error fetching', error);
        return throwError(
          () => new Error('No se pudo obtener ningun pais con esa query')
        )
      })
    );
  }

}
