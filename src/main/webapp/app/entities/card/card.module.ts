import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardsSharedModule } from 'app/shared';
import {
    CardComponent,
    CardDetailComponent,
    CardUpdateComponent,
    CardDeletePopupComponent,
    CardDeleteDialogComponent,
    CardNumberMaskedPipe
    cardRoute,
    cardPopupRoute
} from './';

const ENTITY_STATES = [...cardRoute, ...cardPopupRoute];

@NgModule({
    imports: [CardsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CardComponent, CardDetailComponent, CardUpdateComponent, CardDeleteDialogComponent, CardDeletePopupComponent, CardNumberMaskedPipe],
    entryComponents: [CardComponent, CardUpdateComponent, CardDeleteDialogComponent, CardDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardsCardModule {}
