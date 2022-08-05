import Nextconnect from 'next-connect'
import Multiparty from 'multiparty'

const middleware = Nextconnect()

middleware.use(async (req, res, next) => {
  const form = new Multiparty.Form()

  await form.parse(req, function (err, fields, files) {
    req.body = fields
    req.files = files
    next()
  })
})

export default middleware