import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('Should Get Terms of Service Text', () => {
      page.getSigninText().then(title => {
        expect(title).toEqual('Terms of Service');
      });
    });
  })
});
