import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Res } from "@nestjs/common";
import { adminService } from "./admin.service";
import { UpdateUSerDto } from "src/dtos/updateUser.dto";
import { userDocument } from "src/schema/user.schema";

@Controller('admin')
export class adminController{
    constructor (private AdminService : adminService){}
    @Put('/:id')
    async updateAdmin(@Res() response, @Param('id') adminId : string, @Body() UpdateUSerDto : UpdateUSerDto){
        try {
            const existingAdmin = await this.AdminService.updateAdmin(
                adminId,
                UpdateUSerDto
            );
            return response.status(HttpStatus.OK).json({
                message : 'admin has been successfully updated',
                existingAdmin
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }
    @Get()
    async getAllAdmin(@Res() response): Promise<userDocument>{
        try{
            const adminData = await this.AdminService.getAllAdmin();
            return response.status(HttpStatus.OK).json({
                message : 'All admins data found successfully',
                adminData
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getAdminById( @Param('id') adminId : string) : Promise<userDocument | any>{
        return this.AdminService.getAdminById(adminId);
    }
    @Delete('/:id')
    async deleteAdmin(@Res() response, @Param('id') adminId : string) {
        try {
            const deleteAdmin = await this.AdminService.deleteAdmin(adminId);
            return response.status(HttpStatus.OK).json({
                message : 'admin deleted successfully',
                deleteAdmin
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}