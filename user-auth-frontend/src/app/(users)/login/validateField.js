const validateField = (name, value) => {
    let error = "";

    value = value.trim();

    switch (name) {
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