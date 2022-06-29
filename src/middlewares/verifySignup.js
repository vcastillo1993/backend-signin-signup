/* archivo para verificar validaciones*/
import { Role } from '../models/Role.js'
import User from '../models/User.js'

/* pendiente crear validacion para saber si el usuario existe */
export const checkNameEmailExisted = async( req, res, next) => {
  const user = await User.findOne({username: req.body.username})
  if ( user) return res.status(400).json({message: 'the name user already exists'})

  const email = await User.findOne({email: req.body.email})
  if (email) return res.status(400).json({message: 'the email already exists'})
  next()
}

/* Funcion para verificar el rol ha asignar al usuario ha crear */
export  const checkRolesExisted = (req, res, next) => {
  if(req.body.roles){
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Role.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} no existente`
        })
      }
    }
  }
  next()
}

