import { User } from "src/schemas/user.entity";
import { UserDTO } from "./user.DTO";
import { ResModel } from "src/utils/model/res.mode";

export class UserResDTO  extends ResModel{
    userFound?: UserDTO;
    createdUser?: UserDTO;    
    updatedUser?: UserDTO;
}