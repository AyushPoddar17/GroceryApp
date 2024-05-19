import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import { checkPermission } from "./checkPermission";
export const SECRET_KEY: Secret = 'your-secret-key-here';

interface Decoded extends JwtPayload{
    id:Number,
    name:string,
    type:string
}


function adminAuthentication(permission: string) {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                res.status(501);
                return res.send({
                    message: "Authentication Token not present"
                });
            }
            let decoded= jwt.verify(token, SECRET_KEY);
            if (decoded) {
                let decoded = jwtDecode<Decoded>(token);
                if(checkPermission(permission,decoded.type)){
                    req.body.jwtDecode = decoded;
                    next();

                }else{
                    return res.send({
                        message: "Not Authenticated"
                    });
                }
            }
            else {
                return res.send({
                    message: "Token Not Valid"
                });
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}
export default adminAuthentication;