const { render } = require("../meadowlark")

exports.api = {}

exports.home = (req, res) => {
    res.cookie('moster', 'nom nom')
    res.cookie('signed_monster', 'nom nom', {signed: true})
    res.render('home')
}

exports.notFound = (req ,res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')