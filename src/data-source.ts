import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'eventsDB', 
  synchronize: true, 
  logging: false, 
  entities: [ 
   'src/models/**/*.ts' ],
});

export default AppDataSource;