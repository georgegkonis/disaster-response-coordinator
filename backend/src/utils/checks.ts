import { Role } from '../enums/role.enum';

export const passCharsCheck = (pass: string) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/.test(pass);

export const roleCheck = (role: string) => role === Role.CITIZEN || role === Role.RESCUER;