const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    const items = [{title: 'Go to Work', category: 'work'}]
    const newItem = {title: 'Go Home', category: 'fun'};

    const result = saveItems(items, newItem);

    expect(result).to.eql([{title: 'Go to Work', category: 'work'}, {title: 'Go Home', category: 'fun'}])
  });

  it('makes sure the result and the original are different', () => {
    const items = [{title: 'Go to Work', category: 'work'}]
    const newItem = {title: 'Go Home', category: 'fun'};
    const result = saveItems(items, newItem);

    expect(items).to.not.equal(result);
  });
});
