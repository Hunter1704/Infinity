const validateDetails = require("../../utils/validateDetails");
const password = require("../../utils/password");
const User = require("../../models/users");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    try {
        // it will ensure that role of the registering user is always set to be "user" if register function is not called via admin route 
        if (!req.isAdmin)
            req.body.role = "user";

        /* 
        this validator fnctions ensures that req.body will always have mandatory fields,
        as well as email is in proper format and password is strong 
        */
        validateDetails.register(req.body);

        // hashing password
        req.body.password = await password.hash(req.body.password);

        // creating new user document in the user collection
        const user = await User.create(req.body)

        // generating jwt token
        const token = jwt.sign({ _id: user._id, username: user.username, emailId: user.emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: 3600 });

        // creating reply
        const reply = {
            user: {
                username: user.username,
                fullName: user.fullName,
                _id: user._id,
                emailId: user.emailId,
                emailVerified: user.emailVerified,
                profileImageUrl: user.profileImageUrl,
                streaks: user.streaks
            },
            message: "User registered successfully"
        }

        // sending cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 3600000,
        });

        // sending response with status code

        res.status(201).json(reply);

    } catch (error) {
        console.log(error);

        // Handle MongoDB duplicate key error (username or email already taken)
        if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyValue)[0];
            const friendlyField = duplicatedField === "emailId" ? "Email" : "Username";
            return res.status(409).json({ message: `${friendlyField} is already taken. Please use a different one.` });
        }

        const status = error.statusCode || 500;
        res.status(status).json({ message: error.message });
    }
}

module.exports = register;