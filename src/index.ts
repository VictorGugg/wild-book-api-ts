import express from "express";
import cors from "cors";
import dataSource from "./utils";

// import { Wilder } from "./entity/Wilder";
// import { Skill } from "./entity/Skill";

import wilderController from "./controller/wilderController";
import skillController from "./controller/skillController";

const PORT = 3030;

const app = express();

// using cors to allow connection from other IP (front-end = port 3000, API = port 3030)
app.use(cors());
// allows the app to read .json
app.use(express.json());

// Arrow function "(arguments) => {}" is equivalent to "function (arguments) {}"
// req = request, res = response
app.get("/", (req, res) => {
  res.send("Hello World, this is the end !");
});

// Wilder Routes
app.post("/api/wilder", wilderController.create);
app.get("/api/wilder", wilderController.read);
app.put("/api/wilder/:id", wilderController.update);
app.delete("/api/wilder/:id", wilderController.delete);

app.put("/api/wilder-add-skills", wilderController.addSkills);

// app.put("/api/wilder-rate-skill", wilderController.rateSkill);

// Skill Routes
app.post("/api/skill", skillController.create);
app.get("/api/skill", skillController.read);
app.put("/api/skill/:id", skillController.update);
app.delete("/api/skill/:id", skillController.delete);

const start = async (): Promise<void> => {
  // await makes the script wait for the action to execute before continuing running
  await dataSource.initialize();

  // creates new entry in SQL db
  // dataSource.getRepository(Wilder).save({ name: 'First Wilder'});

  // Starting Server (here on port 3030)
  app.listen(PORT, () => console.log("Server Started on port ", PORT));
};

void start();
