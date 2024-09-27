const validateField = (name, value, formData) => {
    let error = "";

    value = value.trim();

    switch (name) {
        case "name": {
            if (!value) {
                error = "Name is required!";
            }
            break;
        }
        case "email": {
            if (!value) {
                error = "Email is required!";
            } else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                error = "Invalid email format!";
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

        case "confirm_password": {
            if (!value) {
                error = "Confirm password is required!";
            } else if (value != formData.password) {
                error = "password & confirm password is not same!";
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

        default: {
            break;
        }
    }

    return error;
};

export default validateField;