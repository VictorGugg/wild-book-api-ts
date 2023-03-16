import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  skillId: number;

  @Column()
  wilderId: number;

  @ManyToOne(() => Skill, (skill) => skill.grades)
  public skill: Skill;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  public wilder: Wilder;
}
