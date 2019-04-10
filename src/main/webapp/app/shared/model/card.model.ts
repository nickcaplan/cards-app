import { Moment } from 'moment';

export interface ICard {
    id?: number;
    cardNumber?: number;
    bankName?: string;
    expiryDate?: Moment;
}

export class Card implements ICard {
    constructor(public id?: number, public cardNumber?: number, public bankName?: string, public expiryDate?: Moment) {}
}
