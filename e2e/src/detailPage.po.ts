import {by, element } from 'protractor';

export class DetailPage {

  async getTitle() {
    return await element(by.id('title-view')).getText();
  }

  async getId() {
    return await element(by.id('id-value')).getText();
  }

  async getAge() {
    return await element(by.id('age-value')).getText();
  }

  async getCpf() {
    return await element(by.id('cpf-value')).getText();
  }

  async deleteButtonClick() {
    await element(by.id('delete-button')).click();
  }

  async editButtonClick() {
    await element(by.id('edit-button')).click();
  }

}
