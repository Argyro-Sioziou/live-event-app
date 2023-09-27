import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import LocationModel from "@models/location.model"

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

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @ManyToOne(type => LocationModel, location => location.events) location: LocationModel;

    @Column()
    locationId: number

    constructor(title: string, description: string, eventDateTime: Date, locationId: number) {
        this.title = title;
        this.description = description;
        this.eventDateTime = eventDateTime;
        this.locationId = locationId;
      }
}