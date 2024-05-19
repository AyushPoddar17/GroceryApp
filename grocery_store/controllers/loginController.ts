import User from "../models/user";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { SECRET_KEY } from "../libs/adminAuthentication";

export const register = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        const [result, fields] = await new User().insert(data);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({message:'unsucessful',error:error.message});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        let loginCredentials: { email: String, password: String } = req.body;
        let query = `email= "${loginCredentials.email}" AND password = "${loginCredentials.password}"`;
        let [foundUser, fields] = await new User().find(query);
        let user = foundUser[0];
        console.log(foundUser);
        if (foundUser.length > 0) {
            const token = jwt.sign({ id: user.id, name: user.name, type: user.role }, SECRET_KEY, {
                expiresIn: '2 days',
            });
            res.status(200);
            return res.json({
                data: foundUser,
                token:token
            });
        } else {
            res.status(200);
            return res.json({
                message: "EmailId/Password is incorrect."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({message:'unsucessful',error:error.message});
    }
}
