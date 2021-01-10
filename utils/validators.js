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

    if (password === ""){
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

    if (password === ""){
        errors.password = "Password must not be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
