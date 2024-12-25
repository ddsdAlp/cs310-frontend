let userEmail: string = "";

export const setUserEmail = (email:string) =>{
    userEmail = email;
}

export const getUserEmail = () => userEmail;