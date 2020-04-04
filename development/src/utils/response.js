module.exports = (
  res,
  message,
  data = {},
  code = 200
) => {
  return res.status(code).json({
    message,
    data
  })
}