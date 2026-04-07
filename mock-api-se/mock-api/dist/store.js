"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeedData = getSeedData;
exports.getLiveData = getLiveData;
exports.getDashboard = getDashboard;
exports.setLiveData = setLiveData;
const path_1 = __importDefault(require("path"));
const initialData = require(path_1.default.join(__dirname, '..', 'data.json'));
let liveData = JSON.parse(JSON.stringify(initialData));
function getSeedData() {
    return initialData;
}
function getLiveData() {
    return liveData;
}
function getDashboard() {
    const { users: _users, ...dashboard } = liveData;
    return dashboard;
}
function setLiveData(data) {
    liveData = data;
}
