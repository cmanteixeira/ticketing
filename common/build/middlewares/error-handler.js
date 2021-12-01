"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHanler = void 0;
var custom_error_1 = require("../errors/custom-error");
var errorHanler = function (err, req, res, next) {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({
            errors: err.serializeError(),
        });
    }
    console.log(err);
    res.status(400).send({
        errors: [{ message: "Something went wrong" }],
    });
};
exports.errorHanler = errorHanler;
