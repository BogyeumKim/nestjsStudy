import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
      type:'mysql',
      host: process.env.NODE_ENV ==='dev' ? 'localhost' : 'db',
      port: 3306,
      username: 'root',
      password: 'bogyeum25',
      database: 'board-app',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
}