import { Request, Response } from "express";
import dataSource from "../utils";

import { Skill } from "../entity/Skill";

const skillController = {
  create: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Skill).save(req.body);
      // If the operation is a success, THEN send a response X
      res.send("Skill created with success.");
    } catch (err) {
      // If the operation is a failure, CATCH the error (and send a response)
      res.send("Error while creating the skill.");
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const allSkills = await dataSource.getRepository(Skill).find();
      res.send(allSkills);
    } catch (err) {
      console.log("Errors while reading the skills.");
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Skill).update(req.params.id, req.body);
      res.send("Skill updated with success !");
    } catch (err) {
      console.log("Failed to update the skill.");
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Skill).delete(req.params.id);
      res.send("Skill deleted.");
    } catch (err) {
      console.log("Error while deleting the skill.");
    }
  },
};

export default skillController;
