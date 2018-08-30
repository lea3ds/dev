export const errors = {
    default: 'default',
};

export const getError = (err) => {
    if (errors[err] === undefined) {
        console.log('UNDEFINED ERROR: ['+err+']')
        return errors.default;
    }
    return errors[err];
}

