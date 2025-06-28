import jwt from 'jsonwebtoken';
export const generateToken = (userId, res) => {
    const token = jwt.sign(
        { userId }, process.env.JWT_SECRET, {
            expiresIn: '7d' // Token will expire in 7 days
        }
    );
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'development' ? 'Lax' : 'Strict', // Use Lax in development for local cross-origin
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });
    return token;
};