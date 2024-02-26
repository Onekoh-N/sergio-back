import { Rol } from "../roles/rol.enum";
import { UserDTO } from "./user.DTO";

export class RespuestaDTO {
    success: boolean;
    message: string;
    createdUser?: {
        user: string,
        email: string,
        rol: Rol
    };
    updatedUser?: UserDTO;
    error?: string;
}