export type TUser={
    email:string,
    phone:string
    password:string,
    role:'user'|'lender'|'admin',
    isDeleted:boolean,
    agreedToTerms:boolean
}


export type TLogin={
    email:string,
    password:string
}

export type TUpdathPassword={
    currentPassword:string
    newPassword:string
    confirmNewPassword:string
}
export type TResetPassword={
    newPassword:string
    confirmPassword:string
    email:string
}