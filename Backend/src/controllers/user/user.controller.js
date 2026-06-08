import Users from "../../schemas/user/user.schema.js";
import UserService from "../../services/user/user.service.js";


class UserController{
   

    getUsers =  async (req,res)=>{
        
        try{
            const getUsers = await UserService.getData();
            if(!getUsers) throw new Error('No se logró establecer conexión con la base de datos');
            if(getUsers.length == 0) throw new Error("No existen registros en la base de datos")
            res.status(200).send({message:"Usuarios encontrados...", users:getUsers})
        }catch(error){
            res.status(400).send({message:"Error con obtener los registros en la base de datos", err:error.message})
        
        }

    }

    
    register =  async (req,res)=>{
        
        try{
            const {username,password,email} = req.body; 
            if(!username || !password || !email){ 
                throw new Error("Todos los campos son requeridos");
            }
            const newuser = await UserService.registerData(username,password,email);
            
            if(!newuser) throw new Error("No se logro crear el registro");

            res.status(200).send({message:"Registro creado con éxito.", newuser});

        }catch(error){
            res.status(400).send({message:"No fue posible registrar el usuario.",err:error.message})
        }

    }

    deleteUser = async (req,res)=>{
        try{
            const id = req.params.id;
            const userD = await Users.findOneAndDelete({_id:id});
            if(!userD) throw new Error("No fue posible eliminar el registro, verificar por favor registro existente", userD);
            res.status(200).send({message:"Register deleted succesfull", iduser:id, user:userD});
        }catch(error){
            res.status(400).send({message:"Error con la eliminación del registro", err:error.message})
        }            
    }
}



export default UserController;
