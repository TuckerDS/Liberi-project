import { LiberiPage } from './app.po';

describe('liberi App', () => {
  let page: LiberiPage;

  beforeEach(() => {
    page = new LiberiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
