import { PrismaClient, Doctor, Patient } from '@prisma/client'
const prisma = new PrismaClient()



export class DoctorRepositories {

    async getAllDoctors(){
        try {
            const allDoctors = await prisma.doctor.findMany()
            return allDoctors
        } catch (error) {
            throw (error)
        }
    }

    async getDoctorPatients(doctorId : string){
        try {
            const doctorPatients = await prisma.doctor.findUnique({
                where : {
                    id : doctorId
                },
                include : {
                    patients : {
                        include : {
                            medications : true,
                            doctor : true,
                        }
                    }
                }
            })
            if (!doctorPatients) { throw(new Error ('doctor not found')) }
            return doctorPatients.patients
        } catch (error) {
            throw (error)
        }
    }

    async createDoctor(newDoctor : Doctor){
        try {
            const doctor = await prisma.doctor.create({
                data : {
                    name : newDoctor.name,
                    email : newDoctor.email,
                    password : newDoctor.password,
                    phoneNumber : newDoctor.phoneNumber,
                    patientIds : []
                }
            })
            return doctor
        } catch (error) {
            throw(error)
        }
    }

    async removeDoctor(doctorId : string) {
        try {
            const doctor = await prisma.doctor.findUnique({
                where : {
                    id : doctorId
                }
            })
            if (!doctor) { throw(new Error('doctor not found')) }
            await prisma.doctor.delete({
                where : {
                    id : doctorId
                }
            })
        } catch (error) {
            throw(error)
        }
    }

    async updateDoctor(updatedDoctor : Doctor , doctorId : string) {
        const doctor = await prisma.doctor.findUnique({
            where : {
                id : doctorId
            }
        })
        if (!doctor) { throw(new Error('doctor not found')) }
        await prisma.doctor.update({
            where : {
                id : doctorId
            },
            data : {
                email : updatedDoctor.email,
                name : updatedDoctor.name,
                password : updatedDoctor.password,
                phoneNumber : updatedDoctor.phoneNumber,
            },
        })
    }
}





