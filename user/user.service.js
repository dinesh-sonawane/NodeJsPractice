

const e = require('express');
const userModel = require('./user.model');
module.exports = {
    register: async (data, callback) => {
        try {
            await userModel.create(data).then((user) => {
                callback(null, user);
            },err=>{
                callback(err,null)
            })
        } catch (error) {
            console.error(error)
            callback(error, null)
        }
    },
    listUsers: (callback) => {
        try {
            userModel.find().then((users) => {
                callback(null, users);
            },err=>{
                callback(err,null)
            })
        } catch (error) {
            console.error(error)
            callback(error, null);
        }

    },
    getUserById: (id,callback) => {
        try {
            userModel.findById(id).then((user) => {
                callback(null, user);
            },err=>{
                callback(err,null)
            }
            )
        } catch (error) {
            console.error(error);
            callback(error, null);
        }
    },
    getUserByEmailId: (id,callback) => {
        try {
            userModel.findOne({email : id}).then((user) => {
                callback(null, user);
            },err=>{
                callback(err,null)
            }
            )
        } catch (error) {
            console.error(error);
            callback(error, null);
        }
    },
    updateUser: (id,data,callback) => {
        try {
            console.log(id,data)
            userModel.findByIdAndUpdate({ _id: id }, data).then((user) => {
                callback(null, user);
            },err=>{
                callback(err,null)
            }
            )
        } catch (error) {
            console.error(error);
            callback(error, null);
        }

    },
    deleteUser: (id,callback) => {
        try {
            userModel.findOneAndDelete({
                _id: id
            }).then((user) => {
                callback(null, user);
            },err=>{
                callback(err,null)
            }
            )

        } catch (error) {
            console.error(error);
        }

    }
}
