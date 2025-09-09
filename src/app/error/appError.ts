const AppError=(statusCode:number,message:string)=>{
    return{
        statusCode,
        message
    }
}

export default AppError