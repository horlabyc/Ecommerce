const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({
        message: 'Access Denied'
    })
    try {
        const tokenDecoded = jwt.decode(token, process.env.SECRET_KEY);
        if ( Date.now() > (tokenDecoded.exp * 1000)  ) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Access Denied'
            })
        }
        next();
    } catch (err) {
        res.status(401).json({
            statusCode: 401,
            message: 'Access Denied'
        })
    }
}
