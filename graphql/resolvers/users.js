const { UserInputError, ApolloError } = require("apollo-server")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Class = require("../../models/Class");

const { validateRegisterInput, validateLoginInput, validateUserVariables } = require("../../utils/validators");
const checkAuth = require('../../utils/auth');

const SECRET_KEY = process.env.SECRET_KEY;


function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        firstName: user.firstName
    },
    SECRET_KEY,
    {expiresIn: "24h"}
    )
}

module.exports = {
    Query: {
        async getUser(_,__,context){
            const user = checkAuth(context);

            try {
                const {id} = user
                const userData = await User.findById(id);

                return userData
            } catch (error) {
                ApolloError("Error getting user data", {errors : error})

            }

        }
    },
    Mutation: {
        async register(_, {registerInput: {email, password, firstName, lastName, title, micSensitivity, theme}}, context, info){
            const {valid, errors} = validateRegisterInput(email,password, lastName, title);

            if (!valid){
                throw new UserInputError('Unable to Register', {errors})
            }

            const user = await User.findOne({email});

            if ( user ){
                throw new UserInputError('Unable to Register', {
                    errors: {
                        email: "This email address is already taken. Please login."
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

            const token = generateToken(res)


            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        async login(_, {email, password}){
            const {valid, errors} = validateLoginInput(email,password);

            if (!valid){
                throw new UserInputError('Unable to login', {errors})
            }

            const user = await User.findOne({email})

            if (!user){
                throw new UserInputError('Unable to login', {
                    errors: {
                    email: "This email address does not exist. Please register"
                }})
            }

            const pass_match = await bcrypt.compareSync(password, user.password)

            if (!pass_match){

                throw new UserInputError("Unable to login", {errors: {

                    password: "Password does not match"}
                })
            }

            const token = generateToken(user)
                
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async updateUser(_, variables, context){
            console.log("variables", variables)
            const {valid, errors} = validateUserVariables(variables);
            
            if(!valid){
                
                return new UserInputError("Unable to update", {errors})
            
            }

            const user = checkAuth(context)

            var userData = await User.findById(user.id)

            if (variables["password"]){
                // console.log(variables.password)
            }
            if (variables.hasOwnProperty("selectedClassId")){

                const classFound = await Class.findById(variables.selectedClassId)
                
                if (user.id === classFound.teacherId){
                    
                    userData.selectedClassId = classFound.id
                    // console.log(classFound)
                } else {
                    return new UserInputError("Unable to update", { errors : {
                        selectedClassId: "User unable to edit"
                    }})
                }
                
            }

            userData = await userData.save()
            return userData
        }
    }
}