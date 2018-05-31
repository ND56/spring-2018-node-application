// this is the file we'll be testing
const db = require('./db')

// we don't want to just test handleSignup, we also want to test that the
// things inside of it also work, inlcluding db.saveUser
module.exports.handleSignup = (email, password) => {
  // (1) check if the email already exists
  // (2) save the user to the database
  db.saveUser({email, password})
  // (3) send the welcome email
}

// spies let you swap out a real function, like saveUser, for a testing
// utility
// we want our spy to replace saveUser to simulate that it will have been
// called correctly; to do that, we're going to use an npm module called
// "rewire," which lets us swap out variables in our code for our tests
// in our case, in our test file, we'll replace db object with something else;
// it will replace it with a spy
// install -> npm install rewire --save-dev
