"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const store_1 = require("../store");
function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            error: 'Bad Request',
            message: 'username and password are required.',
        });
        return;
    }
    const user = (0, store_1.getSeedData)().users.find((u) => u.username === username && u.password === password);
    if (!user) {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid username or password.',
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, role: user.role }, config_1.config.jwtSecret, { expiresIn: config_1.config.jwtExpiresIn });
    res.status(200).json({
        user: { id: user.id, name: user.name, role: user.role },
        token,
    });
}
