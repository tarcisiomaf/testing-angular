import { ListPage } from './listPage';
import {FormPage} from './formPage.po';
import {browser, by, element, logging, protractor} from 'protractor';
import {DetailPage} from './detailPage.po';


describe('workspace-project App', () => {

  let listPage: ListPage;
  let formPage: FormPage;
  let detailPage: DetailPage;

  beforeAll(() => {
    protractor.promise.delayed(100);
  });

  beforeEach(() => {
    listPage = new ListPage();
    formPage = new FormPage();
    detailPage = new DetailPage();
  });



  it('show table', async () => {
      await listPage.navigateTo();
      expect(listPage.hasTitle()).toBe(true);
      expect(listPage.hasTable()).toBe(true);
    });

  it('add a new Person', async () => {
      const person = {
        name: 'Eustaquio da Silva Costa',
        age: '22',
        cpf: '000.000.000.01',
    };

      await  listPage.navigateTo();
      await listPage.clickAddButton();


      await formPage.setName(person.name);
      await formPage.setAge(person.age);
      await formPage.setCpf(person.cpf);

      await formPage.save();

      expect(detailPage.getTitle()).toEqual(person.name);
      expect(detailPage.getAge()).toBe(person.age);
      expect(detailPage.getCpf()).toBe(person.cpf);
    });

  it('edit a Person', async () => {

    const person = {
      name: 'Eustéquio Silva Costa',
      age: '23',
      cpf: '000.000.000.11',
    };

    await listPage.navigateTo();
    await listPage.clickInLastRow();
    const id = await detailPage.getId();
    await detailPage.editButtonClick();

    await formPage.setName(person.name);
    await formPage.setCpf(person.cpf);
    await formPage.setAge(person.age);
    await formPage.save();

    expect(detailPage.getId()).toBe(id);
    expect(detailPage.getCpf()).toBe(person.cpf);
    expect(detailPage.getAge()).toBe(person.age);
    expect(detailPage.getTitle()).toBe(person.name);
  });

  it('remove a Person', async () => {
    await listPage.navigateTo();
    await listPage.clickInLastRow();
    const id = await detailPage.getId();
    await detailPage.deleteButtonClick();
    expect(listPage.hasRowWithId(id)).toBe(false);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
