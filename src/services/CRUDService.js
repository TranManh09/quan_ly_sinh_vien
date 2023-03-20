
import bcrypt from 'bcryptjs';
import { ExclusionConstraintError } from 'sequelize';
import db from '../models/index'

var salt = bcrypt.genSaltSync(10);
//tao du lieu tren db
let createNewUser = async(data)=>{
    return new Promise(async (resolve,reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.fistName, 
                lastName: data.lastName,
                address : data.address,
                phonenumber: data.phonenumber,
                gender: data.gender ==='1'? true:false,
                roleId: data.roleId,

            })
            
            resolve("create data success")
            // console.log("test CRUD!!!")
         //console.log(data)
        // console.log(hashPasswordFromBcrypt)
        }catch(e){
            console.log(e)
        }
    })
    
}
// hash password dung packe bcrypt
let hashUserPassword = (password) =>{
    return new Promise(async (resolve,reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            console.log(password)
           console.log(hashPassword)
            resolve(hashPassword)
        }catch(e){
            reject(e)
        }
    })
}

let getAllUser = ()=>{
    return new Promise(async (resolve,reject) =>{
        try{
            let users = db.User.findAll({raw: true,})
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let getUserInfoById = (userId)=>{
    return new Promise(async (resolve,reject) => {
        try{
            let user =await db.User.findOne({where: {id: userId},raw: true,})
            if(user)
            {
                resolve(user)
            }
            else{
                resolve({})
            }
        }catch(e){
            reject(e)
        }

    })
}

let updateUserData = async(data) =>{
   return new Promise( async(resolve,reject) => {
    try{
        let user = await db.User.findOne({
            where: {id: data.id},
        })
        if(user)
        {
            user.firstName= data.fistName, 
            user.lastName = data.lastName,
            user.address = data.address
            await user.save()
            let allUser = await db.User.findAll()
            resolve(allUser)
            
        }
        else{
            resolve()
        }
    }catch(e){

    }
   })
}

let deleteUserById = (userId)=>{
    return new Promise(async (resolve,reject) => {
        try{
            let user = await db.User.findOne({where: {id: userId},})
            if(user)
            {
                await user.destroy()
                resolve()
            }
            else{
                resolve()
            }
            
            
        }catch(e){
            reject(e)
        }
    })
}
module.exports ={
    createNewUser: createNewUser,
    getAllUser:getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
} 