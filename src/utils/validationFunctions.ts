export const validEmail = (value: string): string => {
    const isValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(value);
    return !isValid ? "Este campo precisa ser um e-mail válido" : "";
};

export const required = (value: string): string => {
    const isValid = (value && value.toString() as string).trim().length > 0;
    return !isValid ? "Este campo é obrigatório" : "";
};

export const validCpf = (value: string): string => {
    const isValid = (/[0-9]{3}.[0-9]{3}.?[0-9]{3}-[0-9]{2}/i).test(value);
    return !isValid ? "Este campo precisa ser um CPF válido" : "";
};

export const validPhone = (value: string): string => {
    const isValid = (/\(\d{2,}\) \d{4,}-\d{4}/).test(value);
    return !isValid ? "Número informado é inválido" : "";
};

export const isSame = (value: string, valueToCompare: string): string => {
    const isValid = value === valueToCompare;
    return !isValid ? "Os campos não conferem" : "";
};

export const validDate = (value: string): string => {
    const isValid = (/(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/).test(value);
    return !isValid ? "Este campo precisa ser uma data válida": "";
};

export const validPassword = (value: string): string => {
    const hasNoSpecialCharacters = (/^[\w&.-]*$/).test(value);
    const isValid = value.length >= 6 && hasNoSpecialCharacters;
    return !isValid ? "A senha precisa possuir no mínimo 6 caracteres e não pode conter caracteres especiais" : '';
};

export const noSpecialCharactersWithSpace = (value: string): string => {
    const noSpace = value.replaceAll(' ', '');
    const isValid = (/^[\w&.-]*$/).test(noSpace);

    return !isValid ? "Este campo não pode possuir caracteres especiais" : "";
};

export const maxLength = (value: string, maxLength: number): string => {
    return value.length > maxLength ? `Este campo pode ter no máximo ${maxLength} caracteres` : '';
};

export const validHour = (value: string): string => {
    const validFormat = (/[0-9]{2}:[0-9]{2}/).test(value);
    let validHour = false;

    if(validFormat) {
        const splitted = value.split(':');
        const hours = parseInt(splitted[0]);
        const minutes = parseInt(splitted[1]);

        validHour = hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }

    return !validFormat || !validHour ? "Este campo precisa ser uma hora válida": "";
};

export const validEmailOrCpf = (value: string) => {
    const emailError = validEmail(value);
    const emailCpf = validCpf(value);

    return !emailError || !emailCpf ? '' : "O campo precisa ser um e-mail ou cpf válido";
};