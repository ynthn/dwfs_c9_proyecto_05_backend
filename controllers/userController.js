const User = require('../models/User.js');



/**
 * REGISTER USER
 */
const createUser = async (req, res) => {

    try {

        const useEmail = await User.findOne({ email: req.body.email })

        if (useEmail) {
            throw new Error("Email en uso!")
        }

        const newUser = new User(req.body);
        newUser.encriptarPassword(req.body.password);
        await newUser.save();


        res.status(201).json({
            success: true,
            message: "Usuario Creado",
            info: newUser._id,
            token: newUser.generateToken()
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



/**
 * DATA USER
 */
const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const getInfoUser = await User.findById(id).select("-password -salt")

        res.json({ success: true, info: getInfoUser })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * UPDATE USER
 */
const editUser = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        console.log(req.body);

        const updateUser = await User.findByIdAndUpdate(id, { name: name }, { new: true });

        if (password == "") {
            console.log("sinpass");
        } else {
            console.log("conpass");
            updateUser.encriptarPassword(req.body.password);
            await updateUser.save();
        }



        res.json({ success: true, msg: "usuario actualizado", updateUser })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


/**
 * DELETE USER
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const destroyUser = await User.findByIdAndDelete(id);

        res.json({ success: true, msg: "usuario eliminado", destroyUser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


/**
 * LOGIN USERS
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // buscando email en mongo atlas
        console.log(req.body);
        if (!user) {
            throw new Error("Usuario no existe!") // no encontro el usuario
        }

        const validarPassword = user.verificarEncriptacion(password, user.salt, user.password)

        if (!validarPassword) {
            throw new Error('Email o contraseña incorrecta!')
        }

        res.json({ success: true, msg: "Has iniciado sesion correctamente!", token: user.generateToken() })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


/**
 * VERIFY TOKEN USER
 */
const getVerifyUser = async (req, res) => {
    try {
        const { id } = req.auth;
        const getInfoUser = await User.findById(id).select("-password -salt")

        res.json({ success: true, msg: `Informacion de: ${getInfoUser.email}`, info: getInfoUser })
    } catch (error) {
        console.log("entro");
        res.json({ success: false, msg: error.message })
    }
}

module.exports = { createUser, editUser, deleteUser, loginUser, getProfile, getVerifyUser };