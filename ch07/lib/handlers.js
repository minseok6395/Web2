exports.home = (req, res) => res.render('home')
exports.sectionTest = (req, res) => res.rende('section-test')

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')