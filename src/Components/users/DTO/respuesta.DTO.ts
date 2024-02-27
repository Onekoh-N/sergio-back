import { User } from "src/schemas/user.entity";
import { UserDTO } from "./user.DTO";

export class RespuestaDTO {
    success: boolean;
    message: string;
    userFound?: UserDTO;
    createdUser?: UserDTO;    
    updatedUser?: UserDTO;
    error?: string;
}