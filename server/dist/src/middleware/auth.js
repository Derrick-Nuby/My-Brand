import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const userAuthJWT = (req, res, next) => {
    let token;
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const parts = authorizationHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    if (!token) {
        token = req.cookies.jwt;
    }
    if (!token) {
        res.status(401).json({ error: 'Authentication required. Please log in.' });
        return;
    }
    if (token) {
        jwt.verify(token, 'jwtSecret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Failed to authenticate token, Please Login again' });
            }
            const { id, username, isAdmin } = decoded;
            req.userId = id;
            req.lUsername = username;
            req.isAdmin = isAdmin;
            next();
        });
    }
    else {
        res.status(401).json({ error: 'You need to login to access this resource; Please login or create an account' });
    }
};
const adminAuthJWT = (req, res, next) => {
    let token;
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const parts = authorizationHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    if (!token) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return res.status(401).json({ error: 'Authentication required. Please log in.' });
    }
    if (token) {
        jwt.verify(token, 'jwtSecret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Failed to authenticate token, Please Login again' });
            }
            const { id, username, isAdmin } = decoded;
            req.userId = id;
            req.lUsername = username;
            req.isAdmin = isAdmin;
            if (!isAdmin) {
                return res.status(403).json({ message: 'You are not allowed to access this resource, Please contact the site administrator for assistance' });
            }
            next();
        });
    }
    else {
        res.status(401).json({ error: 'You need to login to access this resource; Please login or create an account' });
    }
};
export { userAuthJWT, adminAuthJWT };
//# sourceMappingURL=auth.js.map