export const USER_ROLE={
    admin:"admin",
    user:"user",
    lender:"lender"
} as const

export const UserRole=['admin',"user","lender"]

export type TUser_Role=keyof typeof USER_ROLE