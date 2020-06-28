import expressLoader from "./express"
import sequalizeLoader from './sequalize'
import { Application } from "express";
 
export default async ({ expressApp }:{ expressApp: Application }) => {
    await sequalizeLoader();
    await expressLoader({ app: expressApp });
}
