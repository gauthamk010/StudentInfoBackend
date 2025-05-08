import { Transform, Type } from "class-transformer";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateNested } from "class-validator";
import { Role } from "src/auth/enums/role.enum";

export class UpdateIDDetailsDTO {
    
    @IsOptional()
    @IsNumber()
    @Matches(/^\d{12}$/, { message: 'Aadhar number must be exactly 12 digits' })
    readonly aadhar: number;

    @IsOptional()
    @IsString()
    @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: 'PAN number must be exactly 10 characters' })
    readonly pancard: string;
}

export class UpdateSecondarySchoolDTO {

    @IsOptional()
    @IsString()
    readonly school_name: string;

    @IsOptional()
    @IsNumber()
    @Matches(/^(?:[1-5]?[0-9]{1,2}|600)$/, { message: 'Total must not be less than 0 or exceed 600' })
    readonly total: number;

    @IsOptional()
    @IsNumber()
    @Matches(/^\d{2}\.\d{2}$/, { message: 'Percentage must be a two-point decimal number' })
    readonly percentage: number;
    
    @IsOptional()
    @IsString()
    readonly board_name: string;
    
    @IsOptional()
    @IsNumber()
    @Matches(/^(19|20)\d{2}$/, { message: 'Passing Year must be exactly 4 digits' })
    readonly pass_year: number; 
}

export class UpdateHighSchoolDTO {

    @IsOptional()
    @IsString()
    readonly college_name: string;

    @IsOptional()
    @IsNumber()
    @Matches(/^(?:[1-5]?[0-9]{1,2}|500)$/, { message: 'Total must not be less than 0 or exceed 600' })
    readonly total: number;

    @IsOptional()
    @IsNumber()
    @Matches(/^\d{2}\.\d{2}$/, { message: 'Percentage must be a two-point decimal number' })
    readonly percentage: number;
    
    @IsOptional()
    @IsString()
    readonly board_name: string;
    
    @IsOptional()
    @IsNumber()
    @Matches(/^(19|20)\d{2}$/, { message: 'Passing Year must be exactly 4 digits' })
    readonly pass_year: number;
}

export class UpdateScholarshipDTO {
    
    @IsOptional()
    @IsString()
    readonly received?: string;

    @IsOptional()
    @IsString()
    readonly scholarship_name?: string;
}


export class UpdateStudentDTO {

    @IsOptional()
    @IsString()
    readonly firstname: string;
    
    @IsOptional()
    @IsString()
    readonly middlename: string;
    
    @IsOptional()
    @IsString()
    readonly lastname: string;
    
    @IsOptional()
    @IsEmail({}, { message: 'Please enter correct email' })
    readonly email: string;
    
    @IsOptional()
    @IsNumber()
    @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' })
    readonly phone_number: number;
    
    @IsOptional()
    @IsDateString()
    readonly date_of_birth: Date;
    
    @IsOptional()
    @IsEnum(['male', 'female', 'other'], { message: 'Gender must be male, female or other' })
    readonly gender: string;
    
    @IsOptional()
    @IsString()
    readonly address: string;
    
    @IsOptional()
    @IsString()
    readonly city: string;
    
    @IsOptional()
    @IsString()
    readonly state: string;
    
    @IsNumber()
    @Matches(/^\d{6}$/, { message: 'Pincode must be exactly 6 digits' })
    readonly pincode: number;
    
    @IsOptional()
    @IsString()
    readonly guardian_name: string;
    
    @IsOptional()
    @IsNumber()
    @Matches(/^\d{10}$/, { message: 'Guardian phone number must be exactly 10 digits' })
    readonly guardian_contact: number;
    
    @IsOptional()
    @IsString()
    readonly emergency_contact_name: string;

    @IsOptional()
    @IsNumber()
    @Matches(/^\d{10}$/, { message: 'Emergency contact phone number must be exactly 10 digits' })
    readonly emergency_contact_number: number;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateIDDetailsDTO)
    readonly student_id: UpdateIDDetailsDTO;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateSecondarySchoolDTO)
    readonly secondaryschool: UpdateSecondarySchoolDTO;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateHighSchoolDTO)
    readonly highschool: UpdateHighSchoolDTO;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateScholarshipDTO)
    readonly scholarship: UpdateScholarshipDTO;

    @IsEnum(Role, { each: true })
    @Transform(({ value }) => value ?? [Role.Student])
    readonly roles: Role[]
}