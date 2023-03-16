import { Request, Response } from "express";
import dataSource from "../utils";

import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";
// import { Grade } from "../entity/Grade";

import { Grade } from "../entity/Grade";

const wilderController = {
  create: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      // If the operation is a success, THEN send a response X
      res.send("Wilder created with success.");
    } catch (err) {
      // If the operation is a failure, CATCH the error (and send a response)
      res.send("Error while creating the wilder.");
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const allWilders = await dataSource
        .getRepository(Wilder)
        // find parameters to display newly added first
        .find({
          relations: {
            grades: { skill: true },
          },
          order: { id: "DESC" },
        });
      res.send(allWilders);
    } catch (err) {
      console.log("Errors while reading the wilders.");
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Wilder).update(req.params.id, req.body);
      res.send("Wilder updated with success !");
    } catch (err) {
      console.log("Failed to update the wilder.");
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Wilder).delete(req.params.id);
      res.send("Wilder deleted.");
    } catch (err) {
      console.log("Error while deleting the wilder.");
    }
  },

  // addSkills: async (req: Request, res: Response) => {
  //   try {
  //     const wilderToUpdate = await dataSource
  //       .getRepository(Wilder)
  //       .findOneByOrFail({ name: req.body.wilder });
  //     // console.log to make sure we've got a wilder
  //     console.log(wilderToUpdate);
  //     const skillsToAdd = await dataSource
  //       .getRepository(Skill)
  //       // findBy and In (to get all skills whose name is in the array)
  //       // to get an array from the request (to allow multiple skills selection)
  //       .findBy({ name: In(req.body.skill) });
  //     // console.log to make sure we've got skills
  //     console.log(skillsToAdd);
  //     // We have an array, so we need to use the spread syntax ('...')
  //     // to split the elements of an array (and push them into our skills array).
  //     wilderToUpdate.skills?.push(...skillsToAdd);
  //     await dataSource.getRepository(Wilder).save(wilderToUpdate);
  //     res.send("Skills successfully added to the Wilder !");
  //   } catch (err) {
  //     console.log(err);
  //     res.send("Error while adding the skill.");
  //   }
  // },

  rateSkill: async (req: Request, res: Response) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneByOrFail({ id: req.body.wilderId });
      // console.log to make sure we've got a wilder
      console.log(wilderToUpdate);
      const skillToRate = await dataSource
        .getRepository(Skill)
        .findBy({ id: req.body.skillId });
      // console.log to make sure we've got a skill
      console.log(skillToRate);
      const rating = await dataSource.getRepository(Grade).save({
        wilderId: req.body.wilderId,
        skillId: req.body.skillId,
        rating: req.body.rating,
      });
      console.log(rating);
      wilderToUpdate.grades.push(rating);
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.send("Skill successfully rated !");
    } catch (err) {
      console.log(err);
      res.send("Error while rating the skill.");
    }
  },
};

export default wilderController;
