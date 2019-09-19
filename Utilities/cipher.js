const bcrypt = require('bcryptjs');

const hashData = async (data) => {
    const salt = await bcrypt.genSalt(5);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData
} 

const verifyHash = async (data1, data2) => {
    const same = await bcrypt.compare(data1, data2)
    return same;
}

module.exports = {
    hashData, verifyHash
};