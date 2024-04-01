"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validation_1 = require("../middleware/validation");
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/create", validation_1.validateUserRegister, auth_1.createAccount);
router.post("/login", validation_1.validateUserLogin, auth_1.loginUser);
router.get("/all", auth_2.adminAuthJWT, auth_1.getAllUsers);
router.put("/", auth_2.userAuthJWT, validation_1.validateUserUpdate, auth_1.modifyUser);
router.delete("/", auth_2.userAuthJWT, auth_1.deleteUser);
router.get('/logout', auth_2.userAuthJWT, auth_1.logoutUser);
router.get('/you', auth_2.userAuthJWT, auth_1.getSingleUser);
exports.default = router;