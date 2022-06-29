/* creando funciones de roles para cargarlos en la db  */
import Role from '../models/Role.js'

export const createRoles = async () => {

  try {
    const count = await Role.estimatedDocumentCount()/* funcion para contar si existen documentos */
    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'moderator' }).save(),
      new Role({ name: 'admin' }).save()

    ])
    console.log(values);
  } catch (error) {
    console.log('La creacion de usuarios por defecto fallo ',error);
  }
}