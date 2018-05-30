// basic functions to test
module.exports.add = (a, b) => a + b

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b)
  }, 1000)
}

module.exports.square = (x) => x * x

module.exports.asyncSquare = (x, callback) => {
  setTimeout(() => {
     callback(x * x)
  }, 1000)
}

module.exports.setName = (userObj, fullName) => {
  const names = fullName.split(' ')
  userObj.firstName = names[0]
  userObj.lastName = names[1]
  return userObj
}
