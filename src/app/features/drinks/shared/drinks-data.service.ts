import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tak } from './tak.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { OrdersModule } from '../../orders/orders.module';
import { Leiding } from './leiding.model';
import { Drank } from './drank.model';

@Injectable({
  providedIn: 'root'
})
export class DrinksDataService {
  endpoint = 'tak';
  constructor(private httpClient: HttpClient) {}

  public takken(): Observable<Tak[]> {
    return this.httpClient
      .get<any[]>(`${environment.appUrl}/${this.endpoint}?tabIsAllowed=true`)
      .pipe(
        map(res =>
          res.map(item => {
            const tak = new Tak();
            tak.name = item.naam;
            tak.id = item.id;
            tak.displayName = item.naam;
            tak.order = item.volgorde;
            return tak;
          })
        )
      );
  }

  leiding(takId: number): Observable<Leiding[]> {
    return this.httpClient
      .get<any[]>(`${environment.appUrl}/${this.endpoint}/${takId}/leiding`)
      .pipe(
        map(res =>
          res.map(item => {
            const leiding = new Leiding();
            leiding.id = item.id;
            leiding.firstName = item.voornaam;
            leiding.name = item.naam;
            leiding.displayName = `${item.voornaam} ${item.naam}`;
            leiding.abbreviation = item.afkorting;
            leiding.takId = item.takId;
            leiding.email = item.email;
            return leiding;
          })
        )
      );
  }

  drinks(): Observable<Drank[]> {
    return this.httpClient.get<any[]>(`${environment.appUrl}/drank?sortBy=type.naam`).pipe(
      map(res =>
        res.map(item => {
          const drank = new Drank();

          drank.id = item.id;
          drank.name = item.naam;
          drank.displayName = item.naam;
          drank.price = item.prijs;
          drank.category = item.typeNaam;
          drank.imageUrl = item.imageUrl;
          drank.abbreviation = item.afkorting;
          return drank;
        }))
    );
  }

  submitOrder(order): Observable<any> {
    return this.httpClient.post<any>(`${environment.appUrl}/order`, order);
  }
}
