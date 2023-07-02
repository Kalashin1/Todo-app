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
exports.getTodoByStatus = exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.makeTodo = void 0;
const todos_1 = __importDefault(require("../models/todos"));
const helper_1 = __importDefault(require("../helper"));
const makeTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const todo = yield todos_1.default.create({ title });
        return res.json(todo);
    }
    catch (error) {
        // * handle errors
        const err = (0, helper_1.default)(error);
        res.status(400).json(err);
    }
});
exports.makeTodo = makeTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todos_1.default.find({});
        return res.json(todos);
    }
    catch (error) {
        // * handle errors
        console.log(error);
        res.status(400).json({ error: 'oops something happened' });
    }
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todo = yield todos_1.default.findById(id);
        return res.json(todo);
    }
    catch (error) {
        // * handle errors
        console.log(error);
        res.status(400).json({ error: 'oops something happened' });
    }
});
exports.getTodo = getTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, status } = req.body;
    try {
        const todo = yield todos_1.default.findById(id);
        yield (todo === null || todo === void 0 ? void 0 : todo.updateSelf({
            title: title,
            status: parseInt(status)
        }));
        return res.json({ status: 'updated' });
    }
    catch (error) {
        const err = (0, helper_1.default)(error);
        res.status(400).json(err);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield todos_1.default.findByIdAndDelete(id);
        return res.json({ status: 'deleted' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteTodo = deleteTodo;
const getTodoByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, status } = req.query;
    try {
        const todos = yield todos_1.default.filterTodo({
            limit: parseInt(limit),
            status: parseInt(status)
        });
        return res.json(todos);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getTodoByStatus = getTodoByStatus;
