import Users from "../../schemas/user/user.schema.js";
import UserService from "../../services/user/user.service.js";


class UserController{
    // PARA NO PERDER EL CONTEXTO DE THIS, LOS METODOS SE HACER CON FUNCIONES FLECHAS.
    // EN OTRO CASO O LÓGICA A IMPLEMENTAR SE PUEDE USAR EL METODO BIND.

    // CONTROLADORES
    // Encapsula toda la lógica de la ruta en especifica.
    // Para este caso, user.router.js
    //
    // OBTENER USUARIOS
    getUsers =  async (req,res)=>{
        
        //Controlamos errores para que no caiga la aplicación por parte del backend
        try{
            // Almacenamos en una constante el resultado de nuestra función que nos retorna el servicio de usuarios
            // En este caso obtener todos los usuarios.
            // SERVICIO: Users | UserService.getData()
            const getUsers = await UserService.getData();

            // CASO QUE LA OPERACIÓN NO TUVO ÉXITO
            // LANZAR ERROR:
            if(!getUsers) throw new Error('No se logró establecer conexión con la base de datos');
            
            // CASO EXITÓSO, PERO SIN NINGUN REGISTRO EN LA BD
            // LANZAR SIGUIENTE RESPUESTA
            if(getUsers.length == 0) res.status(200).send({message:"No se encontraron registros existente en la base de datos."})

            // CASO HIPOTÉTICO QUE TODA LA FUNCIÓN FUE NORMAL.
            // MOSTRAR REGISTROS CORRESPONDIENTES.
            res.status(200).send({message:"Usuarios encontrados...", users:getUsers})
        }catch(error){
            // ERRORES O EXCEPCIONES SE CAPTURAN Y SE REDIRIGEN AQUI....
            // CON RES.STATUS ERROR + MENSAJE CORRESPONDIENTE.
            res.status(400).send({message:"Error con obtener los registros en la base de datos", err:error.message})
        
        }

    }

    // CONTROL DE REGISTRO

    register =  async (req,res)=>{
        
        // CAPTURA DE ERRORES
        try{
            // CON DESTRUCTURING, OBTENEMOS A PARTIR DEL BODY, LOS ARGUMENTOS QUE DEBE TENER
            // USERNAME, PASSWORD Y EMAIL
            const {username,password,email} = req.body; 

            // VALIDAMOS QUE SI ESTEN TODOS LOS DATOS EN EL BODY
            if(!username || !password || !email){ 
                //SI NO LO ESTAN LANZAMOS EXCEPCIÓN
                throw new Error("Todos los campos son requeridos");
            }

            // DENTRO DE UNA CONSTANTE ALMACENAMOS EL REGISTRO QUE SE VA CREAR A PARTIR DE NUESTRO SERVICIO
            // SERVICIO: USER | USERSERVICE - REGISTERDATA() REGISTRAR NUEVO DOCUMENTO
            const newuser = await UserService.registerData(username,password,email);
            
            // SI NO SE LOGRO CREAR DOCUMENTO LANZAMOS EXCEPCIÓN
            if(!newuser) throw new Error("No se logro crear el registro");
            
            // CASO CONTRARIO MOSTRAMOS QUE SI SE CREO EL DOCUMENTO CON ÉXITO.
            res.status(200).send({message:"Registro creado con éxito.", newuser});

        }catch(error){
            // TODAS LAS EXCEPCIONES SE REDIRIGEN AQUI Y MUESTRAN EL MENSAJE CORRESPONDIENTE.
            res.status(400).send({message:"No fue posible registrar el usuario.",err:error.message})
        }

    }

    // CONTROL ELIMINACIÓN DE USUARIOS
    deleteUser = async (req,res)=>{
        try{

            // ALMACENAMOS EL ID DE LA URL PARA PODER ENVIAR
            // SE RESCATA DE LOS PARAMETROS CORRESPONDIENTE
            const id = req.params.id;

            // ALMACENAMOS LA SALIDA QUE NOS RETORNARA NUESTRO SERVICIO
            // EN ESTE CASO DEL USUARIO QUE SE VA ELEMINAR
            // SERVICIO: USER - USERSERVICE DELETEREGISTER()
            const userD = await UserService.deleteRegister(id);

            // CASO QUE NO SE LOGRE ELIMINAR EL REGISTRO, LANZAMOS UNA EXCEPCIÓN
            if(!userD) throw new Error("No fue posible eliminar el registro, verificar por favor registro existente", userD);

            // SI TODO SALE BIEN RETORNAMOS LO SIGUIENTE:
            res.status(200).send({message:"Register deleted succesfull", iduser:id, user:userD});
        }catch(error){
            // AQUI LLEGARAN TODAS LAS EXCEPCIONES CORRESPONDIENTES.
            res.status(400).send({message:"Error con la eliminación del registro", err:error.message})
        }            
    }
    
    updateRegister = async (req,res)=>{

            try{
                const id = req.params.id;
                const {username, password, email, active} = req.body;
                let modData = {}
                if(username) modData.username = username;
                if(password) modData.password = password;
                if(email) modData.email = email;
                if(active) modData.active = active;
                const USERMOD = await UserService.updateRegister(id,modData);
                if(!USERMOD) throw new Error("No fue posible actualizar el documento, verificar id o datos del request")
                res.status(200).send({message:"Documento actualizado", output:USERMOD})
            }catch(err){
                res.status(400).send({message:"Error con la actualización del documento", error:err.message})
            }
        }
}



export default UserController;
