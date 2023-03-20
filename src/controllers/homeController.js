import { json } from "body-parser";
import express from "express";
//let express = require("express");

import db from '../models/index'//tai du lieu len db
import CRUDService from '../services/CRUDService'
let getHomePage = async (req, res) => {
    try{
        let data = await db.User.findAll();
        
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e)
    }
    
    
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
//tao crud
let getCRUD = (req,res) =>{
    return res.render('crud.ejs')
}
//them nguoi dung, tu form crud
let postCRUD = async(req,res)=>{
    let message = await CRUDService.createNewUser(req.body)//req.body: lay du lieu nguoi dung
   console.log(message)
    return res.send("post crud thanh cong")
}

let displayCRUD = async (req,res) => {
    let data = await CRUDService.getAllUser()
    console.log("(---------------------------)")
    console.log(data)
    return res.render('displayCRUD.ejs',{
        dataTable: data
    })
}

let getEditCRUD = async(req,res)=>{
    let userId = req.query.id;
    console.log(userId)
    if(userId)
    {
        let userData = await CRUDService.getUserInfoById(userId)
        console.log("-----------------------")
        console.log(userData)
        console.log("-----------------------")
        return res.render("editCRUD.ejs",{
            user: userData
        })
    }
   else{
    return res.send("user not found")
   }
    
}

let putCRUD = async(req,res)=>{
    let data = req.body
    let allUser = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs',{
        dataTable: allUser
    })
}

let deleteCRUD = async(req,res) =>{
    let id = req.query.id//.query laf keyword muon tim kiem
    if(id){
        let deleteUser = await CRUDService.deleteUserById(id)
        return res.send("delete success")
    }
    else{
        return res.send("delete don't success")
    }
    
    
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD:postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}