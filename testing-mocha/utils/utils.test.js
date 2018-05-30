const utils = require('./utils')
const expect = require('expect')

// Test Case #1 **************************************************
// ***************************************************************
it('should add two numbers', () => {
  const res = utils.add(33, 11)

  expect(res).toBe(44).toBeA('number')
})

// Test Case #2 **************************************************
// ***************************************************************
it('should square two numbers', () => {
  const res = utils.square(4)

  expect(res).toBe(16).toBeA('number')
})

// Test Case #3 - Plahying around with assertions ****************
// ***************************************************************
it('should expect some value', () => {
  expect(12).toNotBe(13)
  expect({name: 'Andrew'}).toEqual({name: 'Andrew'})
  expect([1, 2, 3, 4]).toInclude(3)
  expect([1, 2, 3, 4]).toExclude(5)
  expect({
    name: 'Nick',
    age: 28,
    location: 'Boston'
  }).toInclude({
    age: 28
  }).toExclude({
    age: 23
  })
})

// Test Case #4 **************************************************
// ***************************************************************
it('should set first and last name properties on an object', () => {
  const res = utils.setName({ age: 28 }, 'Nicholas Drew')

  expect(res).toInclude({
    firstName: 'Nicholas',
    lastName: 'Drew'
  }).toBeA('object')
})


// Test Case #4 - Async Test *************************************
// ***************************************************************
it('should async add two numbers', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(7).toBeA('number')
    done()
  })
})

// Test Case #5 - Async Test *************************************
// ***************************************************************
it('should async square two numbers', (done) => {
  utils.asyncSquare(4, (sum) => {
    expect(sum).toBe(16).toBeA('number')
    done()
  })
})
