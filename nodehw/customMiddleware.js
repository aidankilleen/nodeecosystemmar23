
function customMiddleWare(req, res, next) {
    
    console.log(`Custom middleware actived:${ req.headers["user-agent"] }`);
    
    if (Math.random() > 0.7) {
        return res.sendStatus(401);
    }

    res.set("info", "Here is some information");
    
    next(); // active the next piece of middleware
    
}

module.exports = customMiddleWare;
