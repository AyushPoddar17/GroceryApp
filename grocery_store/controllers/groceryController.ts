import { Request, Response, query } from 'express';
import db from '../db/index'
import Grocery from '../models/grocery';

export const getAllGroceries = async (req: Request, res: Response) => {
  try {
    const [result,fields] = await new Grocery().findAll();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({message:'unsucessful',error:error.message});
  }
};
export const insertGrocery = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    let [result, fields] = await new Grocery().insert(body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({message:'unsucessful',error:error.message});
  }

}
export const getGrocery = async (req: Request, res: Response) => {

  try {
    let id = req.params['id'];
    let findQuery = `id=${id}`
    let [result, fields] = await new Grocery().find(findQuery);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({message:"Unsucessful",error:error.message});
  }

}
export const updateGrocery = async (req: Request, res: Response) => {
  try {
    let id = req.params['id'];
    let dbQuery = 'id='+id;
    let updateQuery = Object.keys(req.body).map((key) => `${key}=${req.body[key]}`);
    const [result, fields] = await new Grocery().update(dbQuery, updateQuery.join(" "));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({message:'unsucessful',error:error.message});
  }
}
export const deleteGrocery = async (req: Request, res: Response) => {
  try {
    let id = req.params['id'];
    const [result,fields] = await new Grocery().delete(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({message:'unsucessful',error:error.message});

  }
}