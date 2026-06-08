import express from "express";
import Users from "../../schemas/user/user.schema.js";
import UserController from "../../controllers/user/user.controller.js";
import { get } from "mongoose";

class UserRouter{

    constructor(){
        this.controller = new UserController();
        this.router = express.Router();
        this.setRoutes();
    }

    setRoutes(){
        this.router.get('/users', (req,res)=>{
            res.status(200).send({
                message:"Bienvenido a la ruta usuario"
            })
        });

        this.router.get('/users/getusers', this.controller.getUsers)
    
        this.router.post('/users/signup', this.controller.register);

        this.router.put('/users/modify/:id', async (req,res)=>{

            try{
                const id = req.params.id;

                const {username, password, email, active} = req.body;
                let modData = {}
                if(username) modData.username = username;
                if(password) modData.password = password;
                if(email) modData.email = email;
                if(active) modData.active = active;
                const USERMOD = await Users.findOneAndUpdate({_id:id}, modData, {returnDocument:'after'});
                if(!USERMOD) throw new Error("No fue posible actualizar el documento, verificar id o datos del request")
                res.status(200).send({message:"Documento actualizado", output:USERMOD})
            }catch(err){
                res.status(400).send({message:"Error con la actualización del documento", error:err.message})
            }
        })
        
        this.router.delete('/users/delete/:id', this.controller.deleteUser);
        

    }

    getRouter(){
        return this.router;
    }


    
}


export default UserRouter;
