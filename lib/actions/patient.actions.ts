import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {
    try {
      const newuser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      );
  
      return parseStringify(newuser);
    } catch (error: any) {

        console.log('we are in catch')
      if (error && error?.code === 409) {
        const existingUser = await users.list([
          Query.equal("email", [user.email]),
        ]);
  
        return existingUser.users[0];
      }
      console.error("An error occurred while creating a new user:", error);
    }
  };


export const getUser  = async (userID : string) => {
 try {
  const user =  await users.get(userID)

  return parseStringify(user)
 } catch (error) {
  console.log(error)

 }
}