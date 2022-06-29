/* empoinst para los productos crud */
import { Router } from "express";
import * as prroductsCtrl from '../controllers/products.contoller.js'
import { authJwt } from "../middlewares";

const route = Router()
/* ruta para crear productos */
route.post('/',[authJwt.verifyToken, authJwt.isModerator], prroductsCtrl.creacteproducts)
/* ruta para obtener productos */
route.get('/', prroductsCtrl.getproducts)
/* Mostrar producto por ID */
route.get('/:productId', prroductsCtrl.getProductById)
/* Actualizar Producto por Id */
route.put('/:productId', authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin, prroductsCtrl.updateProductById)
/* Eliminar productos por ID */
route.delete('/:productId', [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], prroductsCtrl.deleteProductById)


export default route;