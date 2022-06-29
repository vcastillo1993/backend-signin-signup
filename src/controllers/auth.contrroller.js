import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import config from "../config.js";
import Role from "../models/Role.js";

/* Funcion para crear los usuarios */
export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body;
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  });
  /* si no existe un rol asignado por el usuario */
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } })
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    /*Entonces asignamos el rol user por defecto al momento del registro */
    const role = await Role.findOne({ name: "user" })
    console.log('Rol por defecto', role);
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();
  console.log(savedUser);
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400
  })

  res.status(200).json({ token })

}

/* Funcion para iniciar sessión */
export const signin = async (req, res) => {
  const { email, password } = req.body;
  /* consultando la existencia del email... por lo que userFornd retornara true o false */
  const userFound = await User.findOne({ email: email }).populate('roles')
  /* validando email */
  if (!userFound) return res.status(400).json({ message: "User not fount" })
  /* comparando que el password enviado es el mismo del usuario existente... por lo que la funcion
  matchPassword retornara true o false  */
  const matchPassword = await User.comparePassword(password, userFound.password)
  /* validando el password */
  if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid Password' })
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400
  })
  console.log(userFound);
  res.json({ token })
}

