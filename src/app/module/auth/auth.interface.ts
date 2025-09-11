export type TUser={
    name:string,
    email:string,
    password:string,
    role:'user'|'lender',
    isDeleted:boolean
}


export type TLogin={
    email:string,
    password:string
}

export type TUpdathPassword={
    currentPassword:string
    newPassword:string
    confirmPassword:string
}