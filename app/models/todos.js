"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helper_1 = require("../helper");
const todo_1 = __importDefault(require("../schemas/todo"));
todo_1.default.statics.filterTodo = function ({ limit = 5, status = 0 }) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = this
            .find()
            .where({
            completed: status > 0 ? true : false
        })
            .sort({
            'createdAt': 'desc'
        })
            .limit(limit);
        return todos.exec();
    });
};
todo_1.default.methods.updateSelf = function ({ title, status }) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((status) && (!helper_1.TODO_STATUS[status]))
            throw Error('Invalid todo status');
        yield this.updateOne({
            title,
            status: helper_1.TODO_STATUS[status],
            completed: status && status <= 0 ? false : true
        });
    });
};
const Todos = (0, mongoose_1.model)('todo', todo_1.default);
exports.default = Todos;
