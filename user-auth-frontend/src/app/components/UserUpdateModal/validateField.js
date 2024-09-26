
const validateField = (name, value) => {
    let error = "";

    value = value.trim();

    switch (name) {
        case "name": {
            if (!value) {
                error = "Name is required!";
            }
            break;
        }

        case "password": {
            if (!value) {
                error = "Password is required!";
            } else if (value.length < 6) {
                error = "Password must be at least 6 characters long";
            } else if (!value.match(/\d/)) {
                error = "Password must contain at least one number";
            } else if (!value.match(/[a-zA-Z]/)) {
                error = "Password must contain at least one alphabet";
            } else if (!value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?]/)) {
                error = "Password must contain at least one special character";
            }
            break;
        }

        case "phone": {
            if (!value) {
                error = "Phone number is required!";
            } else if (!value.match(/^[0-9]{10}$/)) {
                error = "Phone number must have 10 digits";
            }
            break;
        }

        case "current_street": {
            if (!value) {
                error = "street field is required!";
            }
            break;
        }

        case "current_city": {
            if (!value) {
                error = "city field is required!";
            }
            break;
        }

        case "current_pincode": {
            if (!value) {
                error = "pincode field is required!";
            } else if (!/^[0-9]{6}$/.test(value)) {
                error = "Pincode must be 6 digits long!";
            }
            break;
        }

        case "current_state": {
            if (!value) {
                error = "state field is required!";
            }
        }

        case "permanent_street": {
            if (!value) {
                error = "street field is required!";
            }
            break;
        }

        case "permanent_city": {
            if (!value) {
                error = "city field is required!";
            }
            break;
        }

        case "permanent_pincode": {
            if (!value) {
                error = "pincode field is required!";
            } else if (!/^[0-9]{6}$/.test(value)) {
                error = "Pincode must be 6 digits long!";
            }
            break;
        }

        case "permanent_state": {
            if (!value) {
                error = "state field is required!";
            }
        }

        default: {
            break;
        }
    }

    return error;
};

export default validateField;