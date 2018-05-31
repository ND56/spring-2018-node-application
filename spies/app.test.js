// spies come built in with expect
const expect = require('expect')
const rewire = require('rewire')
// requires you to use rewire instead of require when you're loading in the
// file you want to mock-out
// we want to replace db with something else, so when we load in app, we need
// to do it in a special way: loads your file in through require, but also adds
// two methods on to our resulting object: (1) app.__set__ and (2) app.__get__
// can use to mock out data inside of app.js; so make a simulation of the db
// object and swap out functioj with a spy
// allows us to test functions that call other functions and make sure
// it's actually doing so
const app = rewire('./app')

describe('App', () => {
  // so here we're instantiating a new db variable that will replace the
  // prior db variable
  const db = {
    saveUser: expect.createSpy()
  }
  // two args, (1) thing you want to replace, and thing replacing with
  app.__set__('db', db)
  // now we can write a test to simulate that handleSignup does in fact call
  // saveUser, where we've replaced saveUser with a spy

  // USING SPY TO TEST APP, HANDLESIGNUP, AND SAVEUSER
  it('should call saveUser with user object', () => {
    const email = 'ndrew56@gmail.com'
    const password = '123abc'

    app.handleSignup(email, password)
    // this should call db.saveUser, but recall we've replaced that with a spy
    // that we can now write assertions about
    expect(db.saveUser).toHaveBeenCalledWith({email, password})
  })

  // EXPLORING SPIES
  it('should call the spy correctly', () => {
    // to create a spy, see below
    const spy = expect.createSpy() // returns a function we will swap in
    spy('Andrew', 25)

    // now set up a series of assertions using the expect spy documentation
    // assertions; check documentation; e.g., toHaveBeenCalled, etc.

    // can check to make sure whatever the spy is a proxy for would have been
    // called by your app
    expect(spy).toHaveBeenCalled()

    // can check to make sure whatever the spy is a proxy for would have been
    // called with certain arguments
    expect(spy).toHaveBeenCalledWith('Andrew', 25)
  })

})
