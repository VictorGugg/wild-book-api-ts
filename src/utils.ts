import { DataSource } from "typeorm";
import { Skill } from "./entity/Skill";
import { Wilder } from "./entity/Wilder";
import { Grade } from "./entity/Grade";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  // TODO check for more info =>
  /*
   * true makes db to adapt to the entities defined by typeORM
   * only use it while dev, not on prod to avoid losing data
   */
  synchronize: true,
  // [Wilder], = [require('./entity/Wilder')],
  entities: [Wilder, Skill, Grade],

  /*
   * adding logging options to obtain logs from
   * successful and failed queries
   */
  logging: ["query", "error"],
});

export default dataSource;
