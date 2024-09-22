// const jwt = require("jsonwebtoken");

// const isAuthenticated = async (req, res,  next) => {
//     try {
//         const token = req.cookies.token; // Assuming the token is in the "Authorization" header
//         if (!token) {
//             return res.status(401).json({ 
//                 message: "No token provided",
//                 success: false
//              });
//         }

//         const decoded = await jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key
//         // req.user = decoded; // Attach decoded user data to request object
//         if(!decoded){
//             return res.status(401).json({
//                 success:false,
//                 message:"Invalid token"
//             })
//         }
//         req.id = decoded.userId;
//         next(); // Call next() to move to the next middleware/route handler
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: "Authentication failed" });
//     }
// }

// module.exports = isAuthenticated;

const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Assuming the token is in the cookies
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "No token provided",
            });
        }

        // Wrap jwt.verify in a promise for async/await
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        if(!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        req.id = decoded.userId;
        next(); // Move to the next middleware/route handler
    } catch (error) {
        console.log(error);
        return res.status(401).json({ 
            success: false,
            message: "Authentication failed" 
        });
    }
};

module.exports = isAuthenticated;
