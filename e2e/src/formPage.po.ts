import { by, element } from 'protractor';

export class FormPage {

  async setName(name) {
    const el = await element(by.id('name'));
    await el.clear();
    await el.sendKeys(name);
  }

  async setCpf(cpf) {
    const el = await element(by.id('cpf'));
    await el.clear();
    await el.sendKeys(cpf);
  }

  async setAge(age) {
    const el = await element(by.id('age'));
    await el.clear();
    await el.sendKeys(age);
  }

  async save() {
    const el = await element(by.id('save'));
    await el.click();
  }

}
