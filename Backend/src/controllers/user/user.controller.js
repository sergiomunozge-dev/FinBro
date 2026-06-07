import Users from "../../schemas/user/user.schema.js";


class UserController{

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
