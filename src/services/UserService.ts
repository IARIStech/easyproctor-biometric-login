import { Get, Patch, Post } from "./BaseService";

import UpdateBiometryDTO from "@/dtos/UpdateBiometryDTO";
import UpdateBiometryResponseDTO from "@/dtos/UpdateBiometryResponseDTO";

const UserService = {
    UpdateUserFace: (data: UpdateBiometryDTO) => {
        return Patch<UpdateBiometryDTO, UpdateBiometryResponseDTO>(
            "api/User/face",
            data
        );
    },
};
export default UserService;
