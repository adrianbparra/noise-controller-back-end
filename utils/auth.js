const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (context) => {
    // context has headers 
    const authHeader = context.req.headers.authorization

    if (authHeader){
        // Bearer
        const token = authHeader.split('Bearer ')[1];

        if (token){
            // verify token
            try {
                const user = jwt.verify(token,SECRET_KEY);
                return user;
            } catch (error) {
                throw new AuthenticationError("Invalid/Expired token");
            }
        }
        throw new AuthenticationError("Authentication token is not in the correct format")

    }

    throw new AuthenticationError("Authorization header was not provided")

}