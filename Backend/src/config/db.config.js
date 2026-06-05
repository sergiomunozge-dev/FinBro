import mongoose from "mongoose";


class MongoDB{
    async conn(URI){
        try{
            const conn = await mongoose.connect(URI)
            if(!conn) throw new Error("No fue posible conectarse a la base de datos, URI no valida o error en parametros");
            console.log("Conexión con la base de datos realizada con éxito");
            return conn;
        }catch(error){
            console.error("Error con establecer conexión con la base de datos.")
        }        
    }   
}

export default MongoDB;
