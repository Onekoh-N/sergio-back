import { UseGuards, applyDecorators } from "@nestjs/common";
import { Rol } from "../../Components/users/roles/rol.enum";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { RolDecorator } from "./roles.decorator";

export function Auth (rol: Rol[]) {
    rol.push(Rol.ADMIN);
    return applyDecorators(
        RolDecorator(rol),
        UseGuards(AuthGuard, RolesGuard),
    )
}