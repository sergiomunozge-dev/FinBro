import Users from "../../schemas/user/user.schema.js";



class UserService{

    static getData = async()=>{
        try{
            const data = await Users.find();
            return data;
        }catch(err){
            console.error("Error:",err.message);
        }
    }

    static registerData = async (usr, pwd, em)=>{
        try{
            const newUser = await Users.create({username:usr,password:pwd,email:em})
            return newUser;
        }catch(err){
            console.error(err.message)
        }
    }

    static deleteRegister = async (id)=>{
        try{
            const deleteData = await Users.findOneAndDelete({_id:id});
            return deleteData;
        }catch(err){
            console.error(err.message);
        }

    }
    static updateRegister = async (id, data)=>{
        try{
            const usermod = await Users.findOneAndUpdate({_id:id}, data, {returnDocument:'after'});
            return usermod;
        }catch(err){
            console.error('Error:', err.message);
        }

    }
}


export default UserService;
