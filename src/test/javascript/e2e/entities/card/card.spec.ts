import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CardComponentsPage, CardUpdatePage } from './card.page-object';

describe('Card e2e test', () => {
    let navBarPage: NavBarPage;
    let cardUpdatePage: CardUpdatePage;
    let cardComponentsPage: CardComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cards', () => {
        navBarPage.goToEntity('card');
        cardComponentsPage = new CardComponentsPage();
        expect(cardComponentsPage.getTitle()).toMatch(/cardsApp.card.home.title/);
    });

    it('should load create Card page', () => {
        cardComponentsPage.clickOnCreateButton();
        cardUpdatePage = new CardUpdatePage();
        expect(cardUpdatePage.getPageTitle()).toMatch(/cardsApp.card.home.createOrEditLabel/);
        cardUpdatePage.cancel();
    });

    it('should create and save Cards', () => {
        cardComponentsPage.clickOnCreateButton();
        cardUpdatePage.setCardNumberInput('5');
        expect(cardUpdatePage.getCardNumberInput()).toMatch('5');
        cardUpdatePage.setBankNameInput('bankName');
        expect(cardUpdatePage.getBankNameInput()).toMatch('bankName');
        cardUpdatePage.setExpiryDateInput('2000-12-31');
        expect(cardUpdatePage.getExpiryDateInput()).toMatch('2000-12-31');
        cardUpdatePage.save();
        expect(cardUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
