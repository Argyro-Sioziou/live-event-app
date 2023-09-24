import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export default class EventModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'datetime' })
    eventDateTime: Date

    @Column({ nullable: true })
    location: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    constructor(title: string, description: string, eventDateTime: Date, location: string) {
        this.title = title;
        this.description = description;
        this.eventDateTime = eventDateTime;
        this.location = location;
      }
}