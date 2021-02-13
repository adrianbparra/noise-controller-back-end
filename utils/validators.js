// Validate input only not bases off database

module.exports.validateRegisterInput = (
    email,
    password,
    lastName,
    title
) => {
    const errors = {};

    if (email.trim() === ""){
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email.match(regEx)){
            errors.email = "Email must be a vaild email address"
        }
    }

    if (password.trim() === ""){
        errors.password = "Password must not be empty"
    }

    if (password.length <= 8){
        errors.password = "Password must be at least 8 characters"
    }

    if (lastName.trim() === ""){
        errors.lastName = "Last name must not be empty"
    }

    if (title.trim() === ""){
        errors.title = "Title must not be blank"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = ( email, password) => {
    const errors = {};

    if (email.trim() === ""){
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regEx)){
            errors.email = "Email must be a vaild email address"
        }
    }

    if (password.trim() === ""){
        errors.password = "Password must not be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
module.exports.validateUserVariables = (variables) => {
    const errors = {};

    if (variables.hasOwnProperty("email")){

        if (variables.email.trim() === ""){
            errors.email = "Email must not be empty";
        } else {
            const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!variables.email.match(regEx)){
                errors.email = "Email must be a vaild email address"
            }
        }
    }

    if (variables.hasOwnProperty("password")){

        if (variables.password.trim() === ""){
            errors.password = "Password must not be empty"
        }

        if (variables.password.length <= 8){
            errors.password = "Password must be at least 8 characters"
        }

    }

    if (variables.hasOwnProperty("lastName")){

        if (variables.lastName.trim() === ""){
            errors.lastName = "Last name must not be empty"
        }
    }

    if (variables.hasOwnProperty("title")){
        if (variables.title.trim() === ""){
            errors.title = "Title must not be blank"
        }
    }

    if (variables.hasOwnProperty("selectedClassId")){
        if (!variables.selectedClassId.match(/^[0-9a-fA-F]{24}$/)) {
            errors.selectedClassId = "Invalid Class"
    
        }
    }

    if (variables.hasOwnProperty("micSensitivity")){
        if (variables.micSensitivity < 1 || variables.micSensitivity > 10){
            errors.micSensitivity = "Value must be between 1 and 10"
        }
    }


    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

}