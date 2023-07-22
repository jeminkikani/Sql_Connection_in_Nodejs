const express = require("express");
const connection = require("../model/utils");
const bcrypt = require("bcrypt");
const { error } = require("console");

const userRoutes = express.Router();

userRoutes.post("/new-user", async (req, res) => {
  try {
    const { user_id, user_name, email, password, confirm_password, mob } = req.body;

    if (password === confirm_password) {

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newuser = {
        user_id,
        user_name,
        email,
        password: hashPassword,
        mob,
      };
    //   console.log(newuser);
      connection.query("insert into user set?", newuser, (error, data) => {
        if (error) console.log(error);
        res.status(201).json(data);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json('server error')
  }
});

userRoutes.get('/get-user' , async(req,res)=>{
    connection.query("select * from user", (error,data)=>{
        if(error){
            console.log(error)
        }
        res.status(200).json(data)
    } )
})
userRoutes.delete('/delete-user', (req,res)=>{
    try {
      const {email} = req.body;
        connection.query("delete from user where email=?", email ,(error , data)=>{
            if(error){
              console.log(error)
            }
            res.status(200).json({data, msg:'your data has been succesfully deleted..'})
        })
        
    } catch (error) {
        console.log(error);
        res.status(404).json('server error')
    }
})

module.exports = userRoutes;
