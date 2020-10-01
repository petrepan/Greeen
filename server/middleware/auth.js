const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "Auth Error" })
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return res.status(401).json({ msg: "Token is not valid" });
          } else {
            req.user = decoded;
            next();
          }
        });
          
    } catch (error) {
        res.status(400).json({ msg: "Token is not valid" })
    }
};