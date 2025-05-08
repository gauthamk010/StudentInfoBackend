import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from 'src/auth/enums/role.enum'

@Schema({ collection: 'students', timestamps: true })
export class User extends Document{

    @Prop({ required: true, unique: [true, 'Email already exists']})
    email: string;
  
    @Prop({ required: true })
    password: string;

    @Prop({ type: [String], enum: Role, default: [Role.Student] })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);   