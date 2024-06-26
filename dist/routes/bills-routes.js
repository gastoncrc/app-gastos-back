"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bills_controllers_1 = require("../controllers/bills-controllers");
const router = (0, express_1.Router)();
router.post("/", bills_controllers_1.createBill);
router.get("/get-bill-by-name", bills_controllers_1.getBillByName);
router.get("/get-bills", bills_controllers_1.getBills);
router.get("/get-bill-by-email/:email", bills_controllers_1.getBillByEmail);
exports.default = router;
// ferperezvl@gmail.com
