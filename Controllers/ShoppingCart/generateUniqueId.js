const randomString = require('randomstring');
const retrieveIdFromToken = require('../../Utilities/retrieveIdFromToken');


module.exports = (req, res) => {
    const token = req.header('auth-token');
    const customerId = retrieveIdFromToken(token);
    const cartId = `${randomString.generate(
        {length: 18, charset: 'alphanumeric'}
    )}${customerId}`
   res.send({
      cardtId: cartId
   })
}