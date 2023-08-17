
const User = require('./user.model');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { register, listUsers, updateUser, deleteUser, getUserById ,getUserByEmailId} = require("./user.service");
module.exports = {
    register: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        register(body, (error, results) => {
            if (error) {
                let errMsg;
                if (error.code == 11000) {
                    errMsg = Object.keys(error.keyValue)[0] + " already exists.";
                } else {
                    errMsg = error.message;
                }
                res.status(400).json({ statusText: "Bad Request", message: errMsg })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    listUsers: (req, res) => {
        listUsers((error, results) => {
            if (error) {
                errMsg = error.message;
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserByEmail: (req, res) => {
        const emailid = req.params.id;
        getUserByEmailId(emailid, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const salt = genSaltSync(10);
        delete body._id;
        delete body.userId;
        body.password = hashSync(body.password, salt);
        updateUser(id, body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully",
                data: results
            });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully",
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmailId(body.email, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            console.log(body.password, results.password)
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    }
}