import expressLoader from "./express"
import sequalizeLoader from './sequalize'
import di from './di'
import { Application } from "express";
 
export default async ({ expressApp }:{ expressApp: Application }) => {
    await expressLoader({ app: expressApp });
    // await sequalizeLoader();
    // await di();
}
