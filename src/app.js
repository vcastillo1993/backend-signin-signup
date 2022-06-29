/* configuracion de la api rutas */

import express from 'express'
import morgan from 'morgan';
import pkg from '../package.json'
/* importando los enrutadores */
import poductRoutes from './routes/products.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import { createRoles } from './libs/initialsSetup';

const app = express()
createRoles();/* invocando esta funcion creramos automaticamente los roles establecidos por defecto
para relacionarlos con los usuarios ha crear  */

app.use(express.json());/* con este metodo hacemos que app entienda los objetos JSON que llegan al servidor  */
app.set('pkg', pkg);
app.use(morgan('dev'));

app.get('/', (req, res) =>{
 res.json({/* trayendo info del package.json del autor */
 author: app.get('pkg').name,
 description: app.get('pkg').description,
 version: app.get('pkg').version
})
  console.log({/* trayendo info del package.json del autor */
    author: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
})

app.use('/api/products', poductRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
   
export default app;