import jwtDecode from "jwt-decode";
import { IUser } from "../schemas";
import { TokenType } from "./types";

export default function handleToken(): { token: string, user: IUser } | null {
    try {
        const extractedToken: Partial<TokenType> = jwtDecode(document.cookie.split("=")[1]);
        if (extractedToken) {
            return {
                token: document.cookie.split("=")[1],
                user: extractedToken.user as IUser
            }
        }
      } catch(e: any) {
        console.log(e.message);
      }

      return null;
}