export const errors = {
    default: "Ha ocurrido un error",
};

export const getError = (err) => errors[err]!==undefined? errors[err]:errors.default;

