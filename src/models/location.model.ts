import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import EventModel from "./event.model"

@Entity()
export default class LocationModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    country: string

    @Column()
    city: string

    @Column()
    address: string

    @Column()
    postalCode: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @OneToMany(type => EventModel, event => event.location) events: EventModel[]; 

    constructor(name: string, country: string, city: string, address: string, postalCode: string) {
        this.name = name;
        this.country = country;
        this.city = city;
        this.address = address;
        this.postalCode = postalCode;
      }
}