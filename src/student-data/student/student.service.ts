import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { Student } from '../schema/student.schema';
import { CreateStudentDTO} from './dto/createstudent.dto';
import { UpdateStudentDTO } from './dto/updatestudent.dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

const generatePassword = async () => {
  const rawPassword = Math.random().toString(36).slice(-8); 
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  return { rawPassword, hashedPassword };
};

@Injectable()
export class StudentService 
{
  constructor(
    @InjectModel(Student.name) 
    private studentModel: mongoose.Model<Student>,
    private authService: AuthService
    ) {}

    async createStudent(createstudentDto: CreateStudentDTO) 
    {
      try {
          const { rawPassword, hashedPassword } = await generatePassword();
          
          const newStudent = new this.studentModel({
              ...createstudentDto,                 
              password: hashedPassword,  
          });
  
          await newStudent.save();
          return { message: "Student created.", email: createstudentDto.email, password: rawPassword };
  
      } catch (error) {
          console.error("Error creating student:", error);
          throw new InternalServerErrorException("Failed to create student.");
      }
  }
  
  async findAllStudents(): Promise<Student[]> 
  {
    const allStudents = await this.studentModel.find({ roles: { $ne: "admin" } });
    return allStudents;
  }

  async findOneStudent(id: string): Promise<Student | null> 
  {
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('Invalid student ID');
    }
    const student = await this.studentModel.findById(new Types.ObjectId(id)).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  } 

  async updateStudent(id: string, updateStudentDto: UpdateStudentDTO) {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(
        id, updateStudentDto, 
        { new: true,  runValidators: true  });
    if (!updatedStudent) {
        throw new HttpException('User not found', 404);
    }
    return updatedStudent;
  }

  async deleteStudent(id: string) {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id);

    if (!deletedStudent) {
        throw new NotFoundException('Student not found');
    }

    return { message: 'Student deleted successfully', deletedStudent };
  }

}
