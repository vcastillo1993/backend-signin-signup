/* rutas de autetnticacion */
import { Router } from "express";
import * as authCtrl from '../controllers/auth.contrroller.js'
import { verifySignup } from "../middlewares";

const route = Router();

route.post('/signup',
[verifySignup.checkNameEmailExisted, 
verifySignup.checkRolesExisted],authCtrl.signup
)

route.post('/signin', authCtrl.signin)/* ruta con funcion para iniciar session */

export default route; 