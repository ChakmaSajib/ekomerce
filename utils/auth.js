import jwtToken from "jsonwebtoken"

const signToken = (user) => {
    console.log(`signToken function is called`)
    return jwtToken.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    }
    )
}

export { signToken }