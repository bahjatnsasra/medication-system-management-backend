import { PrismaClient, Medicin, Patient } from '@prisma/client'
const prisma = new PrismaClient()



export class MedicinRepositories {


    async getMedications(){
        try {
            const medications = await prisma.medicin.findMany()
            return medications
        } catch (error) {
            throw (error)
        }
    }

    async createMedicin(newMedicin : Medicin){
        try {
            const medicine = await prisma.medicin.create({
                data : {
                    name : newMedicin.name,
                    description : newMedicin.description,
                    patientId : newMedicin.patientId,
                    time : newMedicin.time
                },
                include : {
                    patient : true
                }
            })
            return medicine
        } catch (error) {
            throw(error)
        }
    }


    async addMedicinToPatient(newMedicin : Medicin) {
        try {
            const medicine = await this.createMedicin(newMedicin)

            const patient = await prisma.patient.findUnique({ where : { id : medicine.patientId } })

            if(!patient){ throw(new Error('patient not fund')) }

            await prisma.patient.update({
                where : {
                    id : medicine.patientId
                },
                data : {
                    medicationIds : [...patient.medicationIds, medicine.id]
                }
            })
            
            return medicine 
        } catch (error) {
            throw(error)
        }
    }

    async removeMedicin(medicinId : string) {
        try {
            const medicine = await prisma.medicin.findUnique({
                where : {
                    id : medicinId
                }
            })
            if (!medicine) { throw (new Error('medicine not found')) }
            await prisma.medicin.delete({
                where : {
                    id : medicinId
                }
            })
        } catch (error) {
            throw(error)
        }
    }

    async updateMedicin(updatedMedicin : Medicin , medicinId : string) {
        const medicine = await prisma.medicin.findUnique({
            where : {
                id : medicinId
            }
        })
        if (!medicine) { throw (new Error('medicine not found')) }
        await prisma.medicin.update({
            where : {
                id : medicinId
            },
            data : {
                description : updatedMedicin.description,
                name : updatedMedicin.name,
                time : updatedMedicin.time,
            }
        })
    }
}





