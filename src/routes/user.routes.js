import { Router } from "express";
import * as userCtrl from '../controllers/user.controller.js'
import { authJwt, verifySignup } from "../middlewares";
const router = Router();

router.post('/',[
  authJwt.verifyToken, /* Funcion para verificar la valides del token */
  authJwt.isAdmin, /* Funcion para verificar el rol y permiso  */
  verifySignup.checkRolesExisted, /* funcion para verificar que el rol ha insertar exista*/
  verifySignup.checkNameEmailExisted /* funcion para verificar que no este repetido el nombre o email del usuario */
], userCtrl.createUser) /* funcion para crear el usuario */

export default router;
