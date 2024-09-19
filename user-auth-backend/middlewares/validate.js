const validateBody = (schema) => {
    return (req, res, next) => {
        console.log("validateBody", req.body)
        let { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, error })
        }
        next();
    }
}

const validateParams = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, error });
        }
        next();
    }
}

module.exports = {
    validateBody,
    validateParams
}