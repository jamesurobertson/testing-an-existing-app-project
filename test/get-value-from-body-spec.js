const { expect } = require('chai')
const { getValueFromBody } = require('../get-value-from-body')

describe('The getValueFromBody function', () => {
  it('returns an empty string for an empty body', () => {
    // Arrange
    const body = ''
    const key = 'notThere'

    // Act
    // Write code to invoke getValueFromBody and collect
    // the result
    const result = getValueFromBody(body, key)

    // Assert
    // Replace the fail line with an assertion for the
    // expected value of ""
    expect(result).to.equal('')
  })

  it('returns an empty string for a body without the key', () => {
    // Arrange
    const body = 'name=Bess&age=29&job=Boss'
    const key = 'notThere'

    // Act
    // Write code to invoke getValueFromBody and collect
    // the result
    const result = getValueFromBody(body, key)

    // Assert
    // Replace the fail line with an assertion for the
    // expected value of ""
    expect(result).to.equal('')
  })

  it('returns the value of the key in a simple body', () => {
    const body = 'name=Bess'
    const key = 'name'

    // Act
    // Write code to invoke getValueFromBody and collect
    // the result
    const result = getValueFromBody(body, key)

    // Assert
    // Replace the fail line with an assertion for the
    // expected value of "Bess"
    expect(result).to.equal('Bess')
  })

  it('returns the value of the key in a complex body', () => {
    const body = 'name=Bess&age=29&job=Boss'
    // Select one of the keys in the body
    const key1 = 'name'
    const key2 = 'age'
    const key3 = 'job'
    // Act
    // Write code to invoke getValueFromBody and collect
    // the result
    const result1 = getValueFromBody(body, key1)
    const result2 = getValueFromBody(body, key2)
    const result3 = getValueFromBody(body, key3)

    // Assert
    // Replace the fail line with an assertion for the
    // expected value for the key that you selected
    expect(result1).to.equal('Bess')
    expect(result2).to.equal('29')
    expect(result3).to.equal('Boss')
  })

  it('decodes the return value of URL encoding', () => {
    const body = 'name=Bess&age=29&job=Boss&level=Level%20Thirty-One'
    const key = 'level'

    // Act
    // Write code to invoke getValueFromBody and collect
    // the result
    const result = getValueFromBody(body, key)

    // Assert
    // Replace the fail line with an assertion for the
    // expected value for the key that you selected that
    // has the encoded value in it
    expect(result).to.equal('Level Thirty-One')
  })
})
