import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wilder } from "./Wilder";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
}
