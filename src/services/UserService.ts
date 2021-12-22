import { Get, Patch, Post } from "./BaseService";

import UpdateBiometryDTO from "@/dtos/UpdateBiometryDTO";
import UpdateBiometryResponseDTO from "@/dtos/UpdateBiometryResponseDTO";
import LoginDTO from "@/dtos/LoginDTO";
import UserDTO from "@/dtos/UserDTO";

const UserService = {
    UpdateUserFace: (data: UpdateBiometryDTO) => {
        return Patch<UpdateBiometryDTO, UpdateBiometryResponseDTO>(
            "api/User/face",
            data
        );
    },
    Login: (data: LoginDTO) => {
        return Post<LoginDTO, UserDTO>('/api/Auth', data);
    },
};
export default UserService;
