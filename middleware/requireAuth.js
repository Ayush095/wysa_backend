const jwt = require("jsonwebtoken");
const User = require("../models/user");


const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ "Message": "Authorization token required" });
    }

    const token = authorization.split(' ')[1];

    try {
        const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findOne({ email }).select('email');
        next();
    } catch (error) {
        res.status(403).json({ "Message": "Invalid Token" });
    }
}

module.exports = requireAuth;