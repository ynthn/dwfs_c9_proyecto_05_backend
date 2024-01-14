const Product = require("../models/Products")

/**
 * LIST PRODUCTS
 * METHOD GET
 * @param {*} req 
 * @param {*} res 
 */
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, msg: "Lista de productos", info: products })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    }
}

/**
 * PRODUCT BY ID
 * METHOD GET
 * @param {*} req 
 * @param {*} res 
 */
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        res.json({ success: true, msg: "Se ha cargado el producto", product })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    }

}

/**
 * CREATE NEW PRODUCT
 * @param {*} req 
 * @param {*} res 
 */
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.json({ sucess: true, msg: "Create product!", info: newProduct })

    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    }
}

/**
 * EDIT PRODUCT
 * METHOD PUT
 * @param {*} req 
 * @param {*} res 
 */
const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, details, image } = req.body

    try {
        const productEdit = await Product.findByIdAndUpdate(id, { name, price, stock }, { new: true })
        res.status(201).json({
            success: true,
            msg: "Producto editado con exito!!",
            productEdit
        })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    }


}

/**
 * DELETE PRODUCT
 * METHOD DELETE
 * @param {*} req 
 * @param {*} res 
 */
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productDelete = await Product.findByIdAndDelete(id)

        res.json({
            success: true,
            msg: "El producto ha sido eliminado satisfactoriamente!",
            productDelete
        })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    }
}

/**
 * REDUCE STOCK
 * @param {*} req 
 * @param {*} res 
 */
const reduceStock = async (req, res) => {
    const productPurchased = req.body.cartItems;
    try {
        productPurchased.map(async (product) => {
            await Product.findByIdAndUpdate(product._id, { stock: product.stock - product.quantity })
        })
        res.status(201).json({ success: true, msg: "Se ha descontado el stocks de los productos" })
    } catch (error) {
        res.status(201).json({ success: false, msg: "Error al realizar el descuento" });
    }

}




/**
 * EXPORTS
 */
module.exports = { getProducts, createProduct, getProductById, editProduct, deleteProduct, reduceStock }