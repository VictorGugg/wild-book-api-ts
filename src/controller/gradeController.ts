import { Request, Response } from "express";
import { Grade } from "../entity/Grade";
import { Skill } from "../entity/Skill";
import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";

const gradeController = {
  create: async (req: Request, res: Response) => {
    try {
      console.log(req);
      const wilderToGrade = await dataSource
        .getRepository(Wilder)
        .findOneByOrFail({ id: req.body.wilderId });
      console.log("Wilder is : ", wilderToGrade.name);

      const skillToGrade = await dataSource
        .getRepository(Skill)
        .findOneByOrFail({ name: req.body.skillName });
      console.log("Skill is : ", skillToGrade.name);

      await dataSource.getRepository(Grade).save({
        rating: req.body.rating,
        wilder: wilderToGrade,
        skill: skillToGrade,
      });
      res.send("Wilder updated");
      //   {wilderToGrade.name} rated at {'grade'} /10 on the skill {skillToGrade.name}.
    } catch (err) {
      console.log(err);
      res.send("Error while rating the Wilder");
    }
  },

  read: () => {},

  update: () => {},

  delete: () => {},
};

export default gradeController;
