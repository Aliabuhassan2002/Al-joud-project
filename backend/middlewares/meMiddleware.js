const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET; // Use JWT_SECRET for better consistency

// Middleware to verify JWT Token
// const authenticate = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ message: "Access Denied! No valid token provided." });
//   }

//   const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // Attach user data to request
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error.message); // Log error for debugging
//     return res.status(403).json({ message: "Unauthorized access!" });
//   }
// };

// const authentication = (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log(token); // Get token from cookies
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ message: "Forbidden: Invalid token" });
//       }

//       req.user = decoded; // Attach user info to request

//       next();
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const authentication = (req, res, next) => {
  console.log("Cookies received:", req.cookies); // تحقق من الكوكيز

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Middleware for role-based access control
const authorization = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: "Forbidden! You don't have permission." });
  }
  next();
};

module.exports = { authentication, authorization };
