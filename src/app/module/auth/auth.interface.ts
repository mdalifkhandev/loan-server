export type TUser={
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    role:'user'|'lender'|'admin',
    isDeleted:boolean,
    phone:number,
    streetAddress:string
    city:string
    state:string
    zipCode:string
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
export type TResetPassword={
    newPassword:string
    confirmPassword:string
    email:string
}