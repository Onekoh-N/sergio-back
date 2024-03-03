import { UserResDTO } from "src/Components/users/DTO/UserRes.DTO";

export class AuthResDTO  extends UserResDTO{
    token?: string;
    userData?: {
        email: string;
        rol: string;
    }
}