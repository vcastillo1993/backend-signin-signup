/* a qui creamos las funciones para controlar productos como eliminar etc */
/* import  json  from "express"; */
import Product from "../models/Product.js"

export const creacteproducts = async (req, res) =>{
  const {name, category, price, imgURL} = req.body;
  console.log(req.body);
  const neweProducto = new Product({name, category, price, imgURL})
  const productSave = await neweProducto.save()
  res.status(201).json(productSave)
}

export const getproducts = async (req, res) =>{
  const products = await Product.find();
  res.json(products)
}

export const getProductById = async (req, res) =>{
  const product = await Product.findById(req.params.productId)
  console.log(product);
  res.status(200).json(product)
}

export const updateProductById = async (req, res) =>{
  /* llamando funcion de actualizacion de mongo... recibe dos parametros
  el ID del objeto ha buscar y el cuerpo del objeto con los nuevos datos */
  const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body,{
    new: true
  })
  console.log(updateProduct)
res.status(200).json(updateProduct)
}

export const deleteProductById = async (req, res) =>{
  await Product.findByIdAndDelete(req.params.productId)
  res.status(200).json('Producto Eliminado')
}

/* export default product */