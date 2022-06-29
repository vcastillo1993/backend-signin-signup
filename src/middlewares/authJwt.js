/* Aqui creamos las funciones para confirmar que el usuario esta enviando el token */
import config from "../config.js";
import User from "../models/User";
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js'
  
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];/* a qui traemos el token de la cabecera */
    console.log('Valor del token ', token);

    if (!token) return res.status(403).json({ message: "No Token Provided" })

    /* extrallendo lo que hay en el token */
    const decoded = jwt.verify(token, config.SECRET)
    console.log('valor del decoded', decoded);
    req.userId = decoded.id;

    /* confirmando que el usuario exista */
    const user = await User.findById(req.userId, { password: 0 })
    if (!user) return res.status(404).json({ message: 'No user found' })

    next();

  } catch (error) {
    return res.status(401).json({ message: 'unauthorized' })
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId)
  /* A qui buscamos los usuraios que cumplan con el rol */
  const roles = await Role.find({ _id: { $in: user.roles } })
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator" || roles[i].name ==="admin" || roles[i].name === "user") {
      next()
      return;
    }
  }
  console.log(roles);
  return res.status(403).json({message: "Su Rol No Permite Esta Funcion"})
  next();
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)
  /* A qui buscamos los usuraios que cumplan con el rol */
  const roles = await Role.find({ _id: { $in: user.roles } })
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next()
      return;
    }
  }
  console.log(roles);
  return res.status(403).json({message: "Su Rol No Permite Esta Funcion"})
  next();
}

