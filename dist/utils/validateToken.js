import jwt from 'jsonwebtoken';
;
export function isAuth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "You Are Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Error Found", err);
        return res.status(401).json({ message: "Invalid Token" });
    }
}
;
//# sourceMappingURL=validateToken.js.map