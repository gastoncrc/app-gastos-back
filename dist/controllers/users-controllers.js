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
exports.createUser = exports.getUserbyId = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        if (users.length == 0) {
            return res.json({ msg: "No hay usuario en la base de datos" });
        }
        res.json(users);
    }
    catch (error) {
        throw new Error("Error al conectar con el servidor");
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return res.json({ msg: "El usuario no existe" });
        }
        res.json(user);
    }
    catch (error) {
        throw new Error("Error al conectar con el servidor");
    }
});
exports.getUser = getUser;
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findOne({ _id: id });
        if (!user) {
            return res.json({ msg: `El usuario con el ID: ${id} no existe` });
        }
        res.json(user);
    }
    catch (error) {
        throw new Error("Error al conectar con el servidor");
    }
});
exports.getUserbyId = getUserbyId;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        return res.json({ msg: "Faltan datos para crear un usuario" });
    }
    const user = { name, email, age };
    try {
        yield user_1.default.create(user);
        res.json({ msg: "Usuario guardado existosamente" });
    }
    catch (error) {
        throw new Error("Error al conectar con el servidor");
    }
});
exports.createUser = createUser;
