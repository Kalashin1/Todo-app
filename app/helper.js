"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TODO_STATUS = void 0;
function errorHandler(err) {
    const errors = {};
    if (err.message.includes('todo validation failed')) {
        Object.values(err.errors).forEach((error) => {
            if ('properties' in error && error.properties.path) {
                errors[error.properties.path] = error.message;
            }
        });
    }
    return errors;
}
exports.default = errorHandler;
exports.TODO_STATUS = ['PENDING', 'COMPLETED'];
