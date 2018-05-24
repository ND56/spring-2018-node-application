const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

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

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMessage: 'This is my portfolio page!'
  })
})

// *** APPEND SERVER TO LOCAL PORT ***
// ***********************************
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})


// add a new projects page (need handler)
// make new view file
// render everyting header, footer, p can be portoflio
// in partials header file, add new link for projects page
// commit it; push to github; push to heroku remote, which will deploy live
