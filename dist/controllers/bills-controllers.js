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
exports.getBillByEmail = exports.getBills = exports.getBillByName = exports.createBill = void 0;
const bill_1 = __importDefault(require("../models/bill"));
const user_1 = __importDefault(require("../models/user"));
const createBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category, user } = req.body;
    if (!name || !price || !category || !user) {
        return res.json("Faltan datos en el gasto ingresado");
    }
    try {
        const billCreate = yield bill_1.default.create({
            name: name,
            price: price,
            category: category,
            user: user,
        });
        res.json(billCreate);
    }
    catch (error) {
        throw new Error("Error al conectar con el servidor");
    }
});
exports.createBill = createBill;
const getBillByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return res.json("El nombre del gasto está vacío");
    }
    try {
        const bill = yield bill_1.default.findOne({ name: name });
        if (!bill) {
            return res.json({ msg: "No existe un gasto con ese nombre" });
        }
        res.json(bill);
    }
    catch (error) {
        throw new Error("Error al conectar con el servidor");
    }
});
exports.getBillByName = getBillByName;
const getBills = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield bill_1.default.find({}).populate("user");
        if (bills.length == 0) {
            return res.json({ msg: "No hay ningún gasto en la base de datos" });
        }
        res.json(bills);
    }
    catch (error) {
        throw new Error("Error al conectar con el servidor");
    }
});
exports.getBills = getBills;
const getBillByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        return res.json({ msg: "No ha ingresado ningún email" });
    }
    try {
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return res.json({ msg: "No existe el email" });
        }
        const { id } = user;
        const bill = yield bill_1.default.find({ user: id });
        if (!bill) {
            return res.json({
                msg: "No existe un gasto asociado al email ingresado",
            });
        }
        res.json(bill);
    }
    catch (error) {
        throw new Error("Error al conectar con el servidor");
    }
});
exports.getBillByEmail = getBillByEmail;
