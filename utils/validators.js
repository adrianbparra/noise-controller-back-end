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

    if (!variables.selectedClassId.match(/^[0-9a-fA-F]{24}$/)) {
        errors.selectedClassId = "Invalid Class"

    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

}