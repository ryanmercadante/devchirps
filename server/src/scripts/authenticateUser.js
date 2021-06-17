import getToken from '../lib/getToken'

;(async function () {
  const [email, password] = process.argv.slice(2)
  const access_token = await getToken(email, password).catch((err) =>
    console.log(err)
  )
  console.log(access_token)
})()
