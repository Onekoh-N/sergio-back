import { SetMetadata } from "@nestjs/common";
import { Rol } from "../../Components/users/roles/rol.enum";


export const RolDecorator = (rol: Rol[]) => SetMetadata("roles", rol);