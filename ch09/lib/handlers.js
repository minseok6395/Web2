// W3C HTML5 이메일 정규 표현식을 조금 수정했습니다.
// https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

class NewsletterSignup {
    construtor({ name, email}) {
        this.name = name
        this.email = email
    }
    async save() {
        console.log(`[DEBUG]NewletterSignup Name : ${this.name}, Email : ${this.email}`)
    }
}

exports.home = (req, res) => {
    console.log('[DEBUG]handlers.js: home start')
    if(!req.cookies.monster) {
        console.log('[DEBUG]handlers.js:home: montser cookie DOES NOT exits')
        res.cookie("monster", "big bear", {maxAge: 1000000})
    }
    else {
        console.log('[DEBUG]handlers.js:home: montser cookie exits : '+req.cookies.monster)
        res.locals.cookieName = req.cookies.monster
        res.cookie("monster", "big bear", {maxAge: 1000000})
    }
    if(!req.signedCookies.signed_monster) {
        console.log('[DEBUG]handlers.js:home: signed_montser cookie DOES NOT exits')
        res.cookie("signed_monster", "big bear", {signed : true, maxAge: 1000000})
    }
    else {
        console.log('[DEBUG]handlers.js:home: signed_montser cookie exits : '+req.signedCookies.signed_monster)
        res.cookie("signed_monster", "big bear", {signed : true, maxAge: 1000000})
    }
    console.log('[DEBUG]handlers.js:home: cookie set')
    if(!req.session.num) {
        req.session.num = 1
    }
    else {
        req.session.num = req.session.num + 1
    }
    res.locals.sessionNumber = req.session.num
    res.locals.loginUser = req.session.userName
    res.render('home')
}

exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', {csrf: 'CSRF token goes here'})
}

exports.newsletterSignupProcess = (req,res) => {
    const name = req.body.name || '', email = req.body.email || ''
    if(!VALID_EMAIL_REGEX.test(email)) {
        req.session.flash = {
            type: 'danger',
            intro: 'Validation error!',
            message: 'The email address you entered was no valid',
        }
        return res.redirect(303, '/newsletter-signup')
    }
    
    new NewsletterSignup({name, email}).save()
      .then(() => {
          req.session.flash = {
            type: 'sucess',
            intro: 'Thank you!',
            message: 'You have now been signed up for the newsletter.',
        }
        req.session.userName = name
        return res.redirect(303, '/newsletter-archive')
      })
      .catch(err => {
        req.session.flash = {
            type: 'danger',
            intro: 'Database error!',
            message: 'There was a database errr; please try again later.',
      }
      return res.redirect(303, '/newsletter-archive')
    })
}
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')
exports.newsletterArchive = (req, res) => res.render('newsletter-archive')

exports.notFound = (req ,res) => res.render('404')
exports.serverError = (err, req, res, next) => res.render('500')