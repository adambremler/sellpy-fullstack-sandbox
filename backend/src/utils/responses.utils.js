const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: 'Internal server error.',
}

const internalServerError = (req, res, error) => {
  console.log(error)
  res.status(INTERNAL_SERVER_ERROR.code).json(INTERNAL_SERVER_ERROR)
}

module.exports = {
  internalServerError,
}
