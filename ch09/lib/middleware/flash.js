const flashMiddleware = (req, res, next) => {
    // 플래시 메시지가 있다면
    // 콘텍스트에 전달하고 내용을 비웁니다.
	res.locals.flash = req.session.flash
    console.log('[DEBUG]flash.js: flash = '+req.session.flash)
    if(req.session.flash) {
        console.log('[DEBUG]flash.js: tyep = '+req.session.flash.type)
    }
	delete req.session.flash
	next()
}

module.exports = flashMiddleware