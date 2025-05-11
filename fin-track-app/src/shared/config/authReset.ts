import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "./firebase"


export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};