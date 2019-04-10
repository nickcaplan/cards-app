import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICard } from 'app/shared/model/card.model';

type EntityResponseType = HttpResponse<ICard>;
type EntityArrayResponseType = HttpResponse<ICard[]>;

@Injectable({ providedIn: 'root' })
export class CardService {
    private resourceUrl = SERVER_API_URL + 'api/cards';

    constructor(private http: HttpClient) {}

    create(card: ICard): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(card);
        return this.http
            .post<ICard>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(card: ICard): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(card);
        return this.http
            .put<ICard>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICard>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICard[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(card: ICard): ICard {
        const copy: ICard = Object.assign({}, card, {
            expiryDate: card.expiryDate != null && card.expiryDate.isValid() ? card.expiryDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.expiryDate = res.body.expiryDate != null ? moment(res.body.expiryDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((card: ICard) => {
            card.expiryDate = card.expiryDate != null ? moment(card.expiryDate) : null;
        });
        return res;
    }
}
