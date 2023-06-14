// register model
export interface User {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string"
}
// email allready registered error
export const EmailExistError = 'Email Id Already Exists';