import userService from "../services/userService"
let handleLogin = async(req,res)=>{
    let email = req.body.email
    let password = req.body.password
    console.log(password)
    //kiem tra email cos rong hay undefine hay khong
    if(!email ||!password)
    {
        return res.status(500).json({
            errCode: 1,
            message: 'missing input parameter'
        })
    }
   let userData = await userService.handleUserlogin(email,password)
        return res.status(200).json({
           errCode: userData.errCode,
            message:  userData.errMessage,
            userData
        //    user: userData.user ? userData.user : {}
        })
    
   
}

module.exports={
    handleLogin: handleLogin,
}