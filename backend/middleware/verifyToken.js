/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

// const jwt = require("jsonwebtoken");
//
// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "No token provided" });
//     }
//
//     const token = authHeader.split(" ")[1];
//
//     try {
//         req.user = jwt.verify(token, process.env.JWT_SECRET); // includes .id if your token includes it
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Token invalid or expired" });
//     }
// };
//
// module.exports = verifyToken;