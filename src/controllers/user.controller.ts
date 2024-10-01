//logic to create, update and delete user:)
import { createuser } from "../services/user.services";
import { user } from "../types/user";

export const createuserController=async()=>{
    createuser("a" as unknown as user) //check here later
}

export const loginuserController=async()=>{
    console.log("you are logged in dude")
}