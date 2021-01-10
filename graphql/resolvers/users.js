const User = require("../../models/User");
const { UserInputError } = require("apollo-server")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");
const SECRET_KEY = process.env.SECRET_KEY


function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        firstName: user.firstName
    },
    SECRET_KEY,
    {expiresIn: "1h"}
    )
}

module.exports = {
    Mutation: {
        async register(_, {registerInput: {email, password, firstName, lastName, title, micSensitivity, theme}}, context, info){
            const {valid, errors} = validateRegisterInput(email,password, lastName, title);

            if (!valid){
                throw new UserInputError('Unable to Register', {errors})
            }

            const user = await User.findOne({email});

            if ( user ){
                throw new UserInputError("Email address is already taken", {
                    errors: {
                        email: "This email address is taken"
                    }
                })
            }

            password = await bcrypt.hashSync(password, 12);

            const newUser = new User({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                title: title,
                micSensitivity: micSensitivity,
                theme: theme,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save();


            return {
                ...res._doc,
                id: res._id,
            }
        },
        async login(_, {email, password}){
            const {valid, errors} = validateLoginInput(email,password);

            if (!valid){
                throw new UserInputError('Unable to login', {errors})
            }

            const user = await User.findOne({email})

            if (!user){
                throw new UserInputError('Email does not exist', {
                    errors: {
                    email: "This email address does not exist"
                }})
            }

            const pass_match = await bcrypt.compareSync(password, user.password)

            if (!pass_match){

                throw new UserInputError("Password does not match", {errors: {

                    password: "Password does not match"}
                })
            }

            const token = generateToken(user)
                
            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}