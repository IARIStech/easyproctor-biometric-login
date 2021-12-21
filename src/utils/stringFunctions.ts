import { formatISO, parse } from "date-fns";

export const sentenceCase = (value: string): string => {
    const lowerCase = value.slice(1, value.length)?.toLowerCase();
    const upperCase = value[0]?.toUpperCase();
    if(lowerCase && upperCase) {
        return upperCase + lowerCase;
    }
    return value;
}; 

export const titleCase = (value: string): string  => {
    return value.split(" ").map(word => {
        return sentenceCase(word);
    }).join(" ");
};

export const maskCpf = (value: string): string => {
    return `${value.substr(0,3)}.${value.substr(3,3)}.${value.substr(6,3)}-${value.substr(9,3)}`;
};

export const removeCpfMask = (value: string): string => {
    return value.replace(new RegExp('[.-]', 'gi'), '');
};

export const toISODate = (value: string) => {
    const date = parse(value, 'dd/MM/yyyy', new Date());
    return formatISO(date, { representation: 'date' });
};