import { DoctorSearchPage } from './app.po';

describe('doctor-search App', () => {
  let page: DoctorSearchPage;

  beforeEach(() => {
    page = new DoctorSearchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
