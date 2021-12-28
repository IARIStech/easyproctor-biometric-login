export default interface UserDTO {
    cpf: string;
    birthday: string;
    email: string;
    id: number;
    token:string;
    registerStatus:
    | "INSERTED"
    | "BIOMETRY_MISSING"
    | "COMPLETED";
}
