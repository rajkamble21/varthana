
const phone = (value, helpers) => {
    if (!value.match(/^[0-9]{10}$/)) {
        return helpers.message('Phone number must have 10 digits');
    }
}

const pincode = (value, helpers) => {
    if (!value.match(/^[0-9]{6}$/)) {
        return helpers.message('pincode must have 6 digits');
    }
}

const password = (value, helpers) => {
    if (value.length < 6) {
        return helpers.message('password must be 6 characters long');
    }
    if (!value.match(/\d/)) {
        return helpers.message('password must contain at least one number');
    }
    if (!value.match(/[a-zA-Z]/)) {
        return helpers.message('password must contain at least one alphabate');
    }
    if (!value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?]/)) {
        return helpers.message('password must contain at least one special character');
    }
}

module.exports = {
    password,
    phone,
    pincode
}