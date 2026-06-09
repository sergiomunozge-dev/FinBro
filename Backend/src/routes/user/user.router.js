import express from "express";
import UserController from "../../controllers/user/user.controller.js";

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

        this.router.get('/users/getusers', this.controller.getUsers);
    
        this.router.post('/users/signup', this.controller.register);

        this.router.put('/users/modify/:id', this.controller.updateRegister);
        
        this.router.delete('/users/delete/:id', this.controller.deleteUser);
        

    }

    getRouter(){
        return this.router;
    }


    
}


export default UserRouter;
