export default interface UserDTO {
    cpf: string;
    birthday: string;
    email: string;
    id: number;
    name: string;
    registerStatus:
    | "INSERTED"
    | "BIOMETRY_MISSING"
    | "COMPLETED";
}
