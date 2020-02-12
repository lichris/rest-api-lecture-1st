module.exports.get = (req, res, next) => {
  try {
    const users = [
      { id: 1, name: '이희승' },
      { id: 2, name: '이희승' },
      { id: 3, name: '이희승' },
      { id: 4, name: '이희승' },
      { id: 5, name: '이희승' }
    ]

    return res.json({ users })
  } catch (err) {
    next(err)
  }
}