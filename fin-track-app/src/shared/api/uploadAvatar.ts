import axios from "axios";
import { API_URL } from "../config/config";

export const uploadAvatar = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const res = await axios.post<{ url: string }>(
    `${API_URL}/avatar`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data.url;
}