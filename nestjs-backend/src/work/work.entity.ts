import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('works')
export class Work {
  @PrimaryGeneratedColumn() //Sequence id auto increment
  id: number;

  @Column({ nullable: false, default: 'Unnamed' })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  client_site_url: string;

  @Column({ default: true })
  status: boolean;
}
