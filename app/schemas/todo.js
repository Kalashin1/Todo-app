"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helper_1 = require("../helper");
const TodoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    completed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: helper_1.TODO_STATUS[0]
    }
}, {
    timestamps: true
});
exports.default = TodoSchema;
