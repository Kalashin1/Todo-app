"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.default = TodoSchema;
