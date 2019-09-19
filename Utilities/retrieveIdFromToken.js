const jwt = require('jsonwebtoken');

module.exports = token => {
    const tokenInfo = jwt.decode(token,  process.env.SECRET_KEY);
    return tokenInfo.id;
}