const express = require('express')
const hbs = require('hbs')
const fs = require('fs')


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
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
