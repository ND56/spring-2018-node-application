const request = require('supertest')
// IMPORT THE EXPRESS APP
const app = require('./server.js').app
const expect = require('expect')

describe('Server Tests', () => {
  describe('GET /', () => {
    // TEST #1 - VERIFY THAT GET REQUST WILL YIELD "HELLO WORLD" ***********
    // *********************************************************************
    // NOTE: that we're still using Mocha as our framework, we're just using
    // supertest to fill in the gaps
    it('should return hello world response', (done) => {
      // NOTE the HTTP request is an async call, so we will provide done to let
      // mocha know to wait before determining whether test passed or failed.
      // now using supertest; call it and pass in our APP
      request(app)
        .get('/') // takes the URL; now just make assertions
        .expect(200) // this simple syntax tests whether received a 200 OK status
        // .expect('Hello world!') // auto tests against the resp body
        .expect({
          error: 'Page not found.',
          name: 'To-Do App v1.0'
        }) // example of testing if object was sent as body
        // Using supertest, instead of providing an object or a number for a status
        // code, we can provide supertest request a function; this function is
        // gonna get called by supertest and will get passed the res from the API,
        // meaning we will have access to body, headers, etc.
        /// custom expect assertion on the response from the API
        .expect((res) => {
          expect(res.body).toInclude({
            // toInclude lets you specify a subset of properties
            error: 'Page not found.'
          })
        })
        .end(done) // this is how you wrap up assertions in supertest
    })
  })

  describe('GET /users', () => {
    // TEST #2 - VERIFY THAT GET TO USERS WILL WORK CORRECTLY **************
    // *********************************************************************
    it('should return an array of users', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({ name: 'Nick', age: 28 })
        })
        .end(done)
    })
  })
})
