import { Request, Response } from 'express';
import cloudinary from '../config/cloudinaryConfig';

export const upload = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({error: 'No file uploaded'});
    return;
  };
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "avatars" },
      (error, result) => {
        if (error || !result) {
          return res.status(500).json({ error: "Upload failed" });
        }
        res.json({ url: result.secure_url });
      }
    );
    result.end(req.file.buffer)
  } catch (error) {
    res.status(500).json({error: 'upload failed'});
  }
}