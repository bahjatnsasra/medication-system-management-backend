import { PrismaClient, Patient, Medicin } from '@prisma/client'
const prisma = new PrismaClient()



export class PatientRepositories {

    async getPatientMedicatons(patientId : string){
        try {
            const patients = await prisma.patient.findUnique({
                where : {
                    id : patientId
                },
                include : {
                    medications : true
                }
            })
            if (!patients) { throw (new Error('patient not found')) }
            return patients.medications
        } catch (error) {
            throw (error)
        }
    }

    async getAllPatients(){
        try {
            const patients = await prisma.patient.findMany({
                include : {
                    doctor : true,
                    medications : true
                }
            })
            if (!patients) {
                throw(new Error(`can't load patients`))
            }
            return patients
        } catch (error) {
            throw(error)
        }
    }
    

    async createPatient(newPatient : Patient){
        try {
            const patient = await prisma.patient.create({
                data: {
                    name : newPatient.name,
                    doctorId : newPatient.doctorId, 
                    personal_id : newPatient.personal_id,
                    medicationIds : []
                }, 
            });
            return patient
        } catch (error) {
            throw (error)
        }
    }


    async addPatientToDoctor(newPatient : Patient) {
        try {
            const patient = await this.createPatient(newPatient)
            const doctor = await prisma.doctor.findUnique({ where : { id : patient.doctorId } })
            if(!doctor) { throw(new Error('doctor not fund')) }
            await prisma.doctor.update({
                where : {
                    id : patient.doctorId
                },
                data : {
                    patientIds : [...doctor.patientIds, patient.id]
                }
            })
        } catch (error) {
            throw (error)
        }
        
    }

    async removePatient(patientId : string) {
        try {
            const user = await prisma.patient.findUnique({
                where : {
                    id : patientId
                }
            })
            if (!user) {
                throw (new Error('patient not found'))   
            }
            await prisma.patient.delete({
                where : {
                    id : patientId
                }
            })
        } catch (error) {
            
            throw (error)
        }
    }

    async updatePatient(updatedPatient : Patient , patienId : string) {
        try {
            const isUserFound = await prisma.patient.findUnique({
                where : {
                    id : patienId
                }
            })
            if (!isUserFound) {
                
                throw (new Error('patient not found'))   
            }
            const user = await prisma.patient.update({
                where : {
                    id : patienId
                },
                data : {
                    doctorId : updatedPatient.doctorId, 
                    name : updatedPatient.name, 
                    personal_id : updatedPatient.personal_id, 
                    medicationIds : updatedPatient.medicationIds, 
                }
            })
            return user
        } catch (error) {
            console.log(error);
            throw (error)
            
        }
    }
}





