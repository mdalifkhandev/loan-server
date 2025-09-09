import jwt, { type SignOptions }  from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: number
) => {;
  return jwt.sign(jwtPayload, secret, {expiresIn});
};

export const verifyToken=(token:string,secret:string)=>{
    return jwt.verify(token,secret)
}
