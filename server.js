const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

// instantiate port variable; store port using for app
// process.env is an object that stores all of our environment variables as
// key-value pairs; we're looking for one that heroku will set, called "PORT";
// This works great gor heroku, but not for our local server, so we set an
// or condition to 3000
const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// *** MIDDLEWARE ***
// ******************
app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })

  next()
})
app.use(express.static(__dirname + '/public'))

// *** HBS HELPERS ***
// ***************
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

// *** ROUTE HANDLERS ***
// **********************
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Greetings, visitors!'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill request.'
  })
})

// *** APPEND SERVER TO LOCAL PORT ***
// ***********************************
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
