export interface User {
    username: string,
    email: string,
    password: string,
   
}

export interface Credentials{
    username: string,
    password: string
}


export interface LoggedInUser{
    username : string,
    email : string,
    roles:  [string]
}

export interface adminUser {
    username: string,
    email : string,
    roles : [string],
    password: string
}
