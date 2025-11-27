import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  ApiResponseGetJuguetes,
  ApiResponseGetOneJuguete,
  ApiResponseMessage, ApiResponsePaginadoJuguetes,
  Juguete
} from '../common/juguetesInterface';

@Injectable({
  providedIn: 'root',
})
export class JuguetesService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlBase = 'https://api-juguetes.vercel.app/api/v2/juguete/';


  getDataJuguetes(): Observable<ApiResponseGetJuguetes>{
    return this.http.get<ApiResponseGetJuguetes>(this.urlBase+"alljuguetes");
  }
  getDataJuguetesPaginado(page: number): Observable<ApiResponsePaginadoJuguetes>{
    return this.http.get<ApiResponsePaginadoJuguetes>(this.urlBase+"juguetes?page="+page);
  }
  getDataOneJuguete(id: string): Observable<ApiResponseGetOneJuguete>{
    return this.http.get<ApiResponseGetOneJuguete>(this.urlBase+'juguete/'+id);
  }
  getDataPorNombre(nombre: string): Observable<Juguete>{
    return this.http.get<Juguete>(this.urlBase+'jugueteByName/'+nombre);
  }

  postJuguete(juguete: Juguete): Observable<ApiResponseMessage>{
    return this.http.post<ApiResponseMessage>(this.urlBase+"juguetes/", juguete);
  }
  putJuguete(juguete: Juguete): Observable<ApiResponseMessage>{
    return this.http.patch<ApiResponseMessage>(this.urlBase+"update/"+juguete._id, juguete);
  }
  deleteJuguete(id: string): Observable<ApiResponseMessage>{
    return this.http.delete<ApiResponseMessage>(this.urlBase+"delete/"+id);
  }

}
