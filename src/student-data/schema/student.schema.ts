import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/auth/enums/role.enum";

@Schema()
export class IDDetails {
  @Prop({ required: true })
  aadhar: number;

  @Prop({ required: true })
  pancard: string;
}

export const IDDetailsSchema = SchemaFactory.createForClass(IDDetails);

@Schema()
export class SecondarySchool {
  @Prop({ required: true })
  school_name: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true })
  board_name: string;

  @Prop({ required: true })
  pass_year: number;
}

export const SecondarySchoolSchema = SchemaFactory.createForClass(SecondarySchool);

@Schema()
export class HighSchool {
  @Prop({ required: true })
  college_name: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true })
  board_name: string;

  @Prop({ required: true })
  pass_year: number;
}

export const HighSchoolSchema = SchemaFactory.createForClass(HighSchool);

@Schema()
export class Scholarship {
  @Prop({ required: true })
  received: string;

  @Prop()
  scholarship_name?: string;
}

export const ScholarshipSchema = SchemaFactory.createForClass(Scholarship);


@Schema({collection: 'students'})
export class Student extends Document {

    @Prop({ unique: true })
    password: string;

    @Prop({required: true})
    firstname: string;

    @Prop({required: false})
    middlename: string;

    @Prop({required: true})
    lastname: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    phone_number: number;

    @Prop({required: true})
    date_of_birth: Date;

    @Prop({required: true})
    gender: string;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    city: string;

    @Prop({required: true})
    state: string;

    @Prop({required: true})
    pincode: number;

    @Prop({required: true})
    guardian_name: string;

    @Prop({required: true})
    guardian_contact: number;

    @Prop({required: true})
    emergency_contact_name: string;

    @Prop({required: true})
    emergency_contact_number: number;

    @Prop({required: true})
    date_of_admission: Date;

    @Prop({ type: IDDetailsSchema , required: true})
    student_id: IDDetails;

    @Prop({ type: SecondarySchoolSchema, required: true })
    secondaryschool: SecondarySchool;

    @Prop({ type: HighSchoolSchema, required: true })
    highschool: HighSchool;

    @Prop({ type: ScholarshipSchema, required: false })
    scholarship?: Scholarship;

    @Prop({ type: [String], enum: Role, default: ['student'] }) 
    roles: string[] = [Role.Student];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
