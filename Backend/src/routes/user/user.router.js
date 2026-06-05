import express from "express";
import Users from "../../schemas/user/user.schema.js";

class UserRouter{

    constructor(){
        this.router = express.Router();
        this.setRoutes();
    }

    setRoutes(){
        this.router.get('/users', (req,res)=>{
            res.status(200).send({
                message:"Bienvenido a la ruta usuario"
            })
        });
    
        this.router.post('/users/signup', async (req,res)=>{
            try{
                const {username,password} = req.body;
                const newuser = await Users.create({username,password});
                if(!newuser) throw new Error("No se logro crear el registro");

                res.status(200).send({message:"Registro creado con éxito.", newuser});

            }catch(error){
                console.error(error.message);
            }
            
        });

        this.router.delete('/users/delete/:id', async (req,res)=>{
            try{
                const {id} = req.params;
                const userD = await Users.deleteOne({_id:id});
                if(!userD) throw new Error("No fue posible eliminar el registro, verificar por favor registro existente");
                res.status(200).send({message:"Register deleted succesfull"})

            }catch(error){
                console.error("Error:",error.message)
            }

       });

    }

    getRouter(){
        return this.router;
    }
    
}


export default UserRouter;
