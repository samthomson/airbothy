import { AirbothyPage } from './app.po';

describe('airbothy App', function() {
  let page: AirbothyPage;

  beforeEach(() => {
    page = new AirbothyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
