import { element, by, promise, ElementFinder } from 'protractor';

export class CardComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-card div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CardUpdatePage {
    pageTitle = element(by.id('jhi-card-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    cardNumberInput = element(by.id('field_cardNumber'));
    bankNameInput = element(by.id('field_bankName'));
    expiryDateInput = element(by.id('field_expiryDate'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCardNumberInput(cardNumber): promise.Promise<void> {
        return this.cardNumberInput.sendKeys(cardNumber);
    }

    getCardNumberInput() {
        return this.cardNumberInput.getAttribute('value');
    }

    setBankNameInput(bankName): promise.Promise<void> {
        return this.bankNameInput.sendKeys(bankName);
    }

    getBankNameInput() {
        return this.bankNameInput.getAttribute('value');
    }

    setExpiryDateInput(expiryDate): promise.Promise<void> {
        return this.expiryDateInput.sendKeys(expiryDate);
    }

    getExpiryDateInput() {
        return this.expiryDateInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
