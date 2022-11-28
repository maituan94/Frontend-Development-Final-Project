import { provinces } from '../enum/index.js'
import { statusCode } from '../enum/index.js'
import dotenv from 'dotenv'
dotenv.config()
/**
 * It returns a JSON object containing the status code and the data
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 * @returns An array of provinces
 */
const getProvinces = (req, res) => {
    return res.status(statusCode.success).json({
        statusCode: statusCode.success,
        data: provinces
    })
}

/**
 * It checks if the email and password are valid, and if they are, it returns the email
 * @param req - The request object.
 * @param res - The response object.
 * @returns - If the email and password are not provided, or the email and password are not correct,
 * the server will return a status code of 400 and an error message.
 *     - If the email and password are correct, the server will return a status code of 200 and the
 * email.
 *     - If there is an internal server error, the server will return a status code of 500
 */
const login = (req, res) => {
    const { email, password } = req.body

    const adminEmail = process.env.ADMIN
    const adminPassword = process.env.PASSWORD

    if (!email || !password || email !== adminEmail || password != adminPassword) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: 'Invalid email or password!'
        })
        return
    } 

    if (email === adminEmail && password === adminPassword) {
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: email
        })
        return
    }
    res.status(statusCode.success).json({
        statusCode: statusCode.internalServerError,
        message: 'Internal Server Error!'
    })
}

export {
    getProvinces,
    login
}
