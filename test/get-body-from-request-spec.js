const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();

  });

  it('returns an empty string for no body', () => {

    const result = getBodyFromRequest(fakeReq)
    fakeReq.emit('end')

    return result.then(body => {
        expect(body).to.equal('');
    })
  });

  it('returns the data read from the stream', () => {
    const result = getBodyFromRequest(fakeReq)
    fakeReq.emit('data', 'categoryName=Not+very+fun')
    fakeReq.emit('end')

    return result.then(body => {
        expect(body).to.equal('categoryName=Not+very+fun');
    })
  });
});
