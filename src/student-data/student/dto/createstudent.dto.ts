import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { Role } from "src/auth/enums/role.enum";


export class IDDetailsDTO {
    
    @IsNotEmpty()
    @IsNumber()
    @Matches(/^\d{12}$/, { message: 'Aadhar number must be exactly 12 digits' })
    readonly aadhar: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: 'PAN number must be exactly 10 characters' })
    readonly pancard: string;
}

export class SecondarySchoolDTO {

    @IsNotEmpty()

    @IsString()
    readonly school_name: string;

    @IsNotEmpty()
    @IsNumber()
    @Matches(/^(?:[1-5]?[0-9]{1,2}|600)$/, { message: 'Total must not be less than 0 or exceed 600' })
    readonly total: number;

    @IsNotEmpty()
    @IsNumber()
    @Matches(/^\d{2}\.\d{2}$/, { message: 'Percentage must be a two-point decimal number' })
    readonly percentage: number;
    
    @IsNotEmpty()
    @IsString()
    readonly board_name: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Matches(/^(19|20)\d{2}$/, { message: 'Passing Year must be exactly 4 digits' })
    readonly pass_year: number; 
}

export class HighSchoolDTO {

    @IsNotEmpty()
    @IsString()
    readonly college_name: string;

    @IsNotEmpty()
    @IsNumber()
    @Matches(/^(?:[1-5]?[0-9]{1,2}|500)$/, { message: 'Total must not be less than 0 or exceed 600' })
    readonly total: number;

    @IsNotEmpty()
    @IsNumber()
    @Matches(/^\d{2}\.\d{2}$/, { message: 'Percentage must be a two-point decimal number' })
    readonly percentage: number;
    
    @IsNotEmpty()
    @IsString()
    readonly board_name: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Matches(/^(19|20)\d{2}$/, { message: 'Passing Year must be exactly 4 digits' })
    readonly pass_year: number;

}

export class ScholarshipDTO {
    
    @IsOptional()
    @IsString()
    readonly received?: string;

    @IsOptional()
    @IsString()
    readonly scholarship_name?: string;
}

export class CreateStudentDTO {

    @IsNotEmpty()
    @IsString()
    readonly firstname: string;
    
    @IsNotEmpty()
    @IsString()
    readonly middlename: string;
    
    @IsNotEmpty()
    @IsString()
    readonly lastname: string;
    
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    readonly email: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' })
    readonly phone_number: number;
    
    @IsNotEmpty()
    @IsDateString()
    readonly date_of_birth: Date;

    @IsNotEmpty()
    @IsDateString()
    readonly date_of_admission: Date;
    
    @IsNotEmpty()
    @IsEnum(['male', 'female', 'other'], { message: 'Gender must be male, female or other' })
    readonly gender: string;
    
    @IsNotEmpty()
    @IsString()
    readonly address: string;
    
    @IsNotEmpty()
    @IsString()
    readonly city: string;
    
    @IsNotEmpty()
    @IsString()
    readonly state: string;
    
    @IsNumber()
    @Matches(/^\d{6}$/, { message: 'Pincode must be exactly 6 digits' })
    readonly pincode: number;
    
    @IsNotEmpty()
    @IsString()
    readonly guardian_name: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Matches(/^\d{10}$/, { message: 'Guardian phone number must be exactly 10 digits' })
    readonly guardian_contact: number;
    
    @IsNotEmpty()
    @IsString()
    readonly emergency_contact_name: string;

    @IsNotEmpty()
    @IsNumber()
    @Matches(/^\d{10}$/, { message: 'Emergency contact phone number must be exactly 10 digits' })
    readonly emergency_contact_number: number;
    
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => IDDetailsDTO)
    readonly student_id: IDDetailsDTO;
    
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SecondarySchoolDTO)
    readonly secondaryschool: SecondarySchoolDTO;
    
    @IsNotEmpty()
    @ValidateNested()
    readonly highschool: HighSchoolDTO;
    
    @IsNotEmpty()
    @ValidateNested()
    readonly scholarship: ScholarshipDTO;

   @IsEnum(Role, { each: true })
   @Transform(({ value }) => value ?? [Role.Student])
   readonly roles: Role[]
}