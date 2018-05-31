const request = require('supertest')
// IMPORT THE EXPRESS APP
const app = require('./server.js').app
const expect = require('expect')

describe('Server Tests', () => {

  describe('GET /', () => {
    // TEST #1 - VERIFY THAT GET REQUST WILL YIELD "HELLO WORLD" ***********
    // *********************************************************************
    it('should return hello world response', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect({
          error: 'Page not found.',
          name: 'To-Do App v1.0'
        })
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found.'
          })
        })
        .end(done)
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
