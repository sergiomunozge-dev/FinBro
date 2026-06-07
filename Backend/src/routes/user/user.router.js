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

        this.router.get('/users/getusers', async (req,res)=>{
            try{
                const getUsers = await Users.find();
                if(!getUsers) throw new Error('No se logró establecer conexión con la base de datos');
                if(getUsers.length == 0) throw new Error("No existen registros en la base de datos")
                res.status(200).send({message:"Usuarios encontrados...", users:getUsers})
            }catch(error){
                res.status(400).send({message:"Error con obtener los registros en la base de datos", err:error.message})
            }

        })
    
        this.router.post('/users/signup', async (req,res)=>{
            try{
                
                const {username,password,email} = req.body;
                
                if(!username || !password || !email){ 
                    throw new Error("Todos los campos son requeridos");
                }

                const newuser = await Users.create({username,password,email});
                
                if(!newuser) throw new Error("No se logro crear el registro");

                res.status(200).send({message:"Registro creado con éxito.", newuser});

            }catch(error){
                res.status(400).send({message:"No fue posible registrar el usuario.",err:error.message})
            }
            
        });

        this.router.delete('/users/delete/:id', this.controller.deleteUser);
        
    }

    getRouter(){
        return this.router;
    }


    
}


export default UserRouter;
