import { Request, Response } from "express";
import { defaultCategoriesKeywords } from "../data/defaultCategoriesKeywords";
import { CategoryModel } from "../models/Category";

const getRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
};

export const detectCategory = async (req: Request, res: Response) => {
  const { description, userId } = req.body;
  if (!description || !userId) {
    res.status(400).json({error: 'Description and userId are required'});
    return;
  }
  
  let detectedCategory: string | null = null;
  for (const [category, keywords] of Object.entries(defaultCategoriesKeywords)) {
    for (const keyword of keywords) {
      if (description.toLowerCase().includes(keyword.toLowerCase())) {
        detectedCategory = category;
        break;
      }
    }
    if (detectedCategory) break;
  }

  if (!detectCategory) {
    res.json({ category: null });
    return;
  };

  let categoryDoc = await CategoryModel.findOne({userId, name: detectCategory});
  if (!categoryDoc) {
    categoryDoc = await CategoryModel.create({
      userId,
      id: crypto.randomUUID ? crypto.randomUUID() : undefined,
      name: detectCategory,
      color: getRandomColor
    });
  }

  res.json({ category: categoryDoc.name});
  return;
}