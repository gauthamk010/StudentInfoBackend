import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, NotFoundException, Request } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/createstudent.dto';
import { UpdateStudentDTO } from './dto/updatestudent.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import { RolesGuard } from "src/auth/guards/roles.guard";


@Controller('student')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('new')
  @Roles(Role.Admin)
  createStudent(@Body() createStudentDto: CreateStudentDTO) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Get('all')
  @Roles(Role.Admin)
  findAllStudents() {
    return this.studentService.findAllStudents();
  }

  @Get('me')
  @Roles(Role.Admin, Role.Student)
  async getStudent(@Request() req) {
    const userId = req.user.id;
    return this.studentService.findOneStudent(userId);
  }
  

  @Put('update/:id')
  @Roles(Role.Admin)
  updateStudent(@Param('id') id: string, @Body() updateStudentDTO: UpdateStudentDTO) {
    return this.studentService.updateStudent(id, updateStudentDTO);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin)
  removeStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}