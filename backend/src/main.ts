import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config(); // Load environment variables

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors=require("cors");
  const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) // Use this after the variable declaration
 
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
