import pbkdf2 from 'pbkdf2'

const getToken = function (str, salt = '10101101011001010011101010') {
  return new Promise((resolve, reject) => {
    pbkdf2.pbkdf2(str, salt, 500000, 64, 'sha512', (err, key) => {
      if (err) return reject(err)
      resolve(key.toString('hex'))
    })
  })
}

export default getToken
