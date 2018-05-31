const express = require('express')

const app = express()

// ROUTE HANDLERS
app.get('/', (req, res) => {
  // Here's an example of how we can send a custom status code with our response
  // The default status code is 200
  // res.status(200).send('Hello world!')

  // now testing sending an object as the body
  res.status(200).send({
    error: 'Page not found.',
    name: 'To-Do App v1.0'
  })
})

app.get('/users', (req, res) => {
  const user1 = { name: 'Nick', age: 28 }
  const user2 = { name: 'Kim', age: 28 }
  const user3 = { name: 'Kay', age: 28 }

  res.status(200).send([user1, user2, user3])
})

// LISTEN ON PORT
app.listen(3000)

// EXPORT OUR APP FOR TESTING
module.exports.app = app
