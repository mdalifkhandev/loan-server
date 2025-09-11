const AppError=(statusCode:number,message:string)=>{
    const error= new Error(message) as Error & {statusCode:number,name:string}
    error.statusCode=statusCode,
    error.name='AppError'
    return error
}

export default AppError