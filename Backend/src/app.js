import express from "express";
import MongoDB from "./config/db.config.js";
import UserRouter from "./routes/user/user.router.js"

class App {

    constructor(){
        this.app = express();
        this.setDependencies();
        this.config();
        this.middlewares();
        this.routes();
    }

    setDependencies(){
        this.DB = new MongoDB();
        this.URI = process.env.MONGOURI;
        this.usrRouter = new UserRouter();
        
    }
    
    async config(){
        try{
            this.PORT = process.env.FINBROPORT || 3000;            
            this.CONN = await this.DB.conn(this.URI);

        }catch(error){
            console.error("Error con establecer configuración del servidor. app.js", error.message);
        }
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes(){
        this.app.use('/api/v1/', this.usrRouter.getRouter());
        this.app.get('/',(req,res)=>{   
            res.status(200).send({message:"Bienvenidos a la ruta test de la aplicación FinBro"});
        })
    }

    runApp(){
        this.app.listen(this.PORT,()=>{

            console.log(`App running on port http://localhost:${this.PORT}`);
        })
    }

}


export default App;
