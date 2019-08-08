import { browser, by, element } from 'protractor';

export class ListPage {

  async navigateTo() {
    return browser.get(browser.baseUrl);
  }

  async hasTitle() {
    return element(by.id('list-title')).isPresent();
  }

  async hasTable() {
    return element(by.id('table-div')).isPresent();
  }

  async clickInLastRow() {
    const el = await element.all(by.css('.p-table-row')).last();
    await el.click();
  }

  async hasRowWithId(id) {
    return element(by.id(id)).isPresent();
  }

  async clickAddButton() {
    const el =  await element(by.id('add-button'));
    await el.click();
  }


}
