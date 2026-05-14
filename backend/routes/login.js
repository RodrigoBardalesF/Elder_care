import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



function login  (username, password, data){
    const user = data.findOne(username)
    if (!user) throw new Error ("Username doesn't exist")
    const isValid = bcrypt.compare(password, user.password)
    if (!isValid) throw new Error ("password is invalid")
    return {
        username: user.username
    }

}

export default login