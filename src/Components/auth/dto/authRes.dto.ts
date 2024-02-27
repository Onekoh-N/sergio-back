import { RespuestaDTO } from "src/Components/users/DTO/respuesta.DTO";

export class AuthResDTO  extends RespuestaDTO{
    token?: string;
    userData?: {
        email: string;
        rol: string;
    }
}