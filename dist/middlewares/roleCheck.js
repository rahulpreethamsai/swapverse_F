export function requireRole(role) {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "No user found on request" });
            }
            if (req.user.role !== role) {
                return res.status(403).json({ message: "Access denied, admin only" });
            }
            next();
        }
        catch (error) {
            console.error("Role middleware error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    };
}
//# sourceMappingURL=roleCheck.js.map