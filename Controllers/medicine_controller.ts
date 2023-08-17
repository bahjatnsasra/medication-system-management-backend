import { Request ,Response } from 'express';
import {MedicinRepositories} from '../Repositories/medicine_repositories'

const medicineRepositories = new MedicinRepositories()


export class MedicineController {

    async getDoctors(req : Request , res : Response){
        const medications = await medicineRepositories.getMedications()
        res.status(200).send(medications)
        res.end()
    }



    async addMedicinToPatient(req : Request , res : Response){
        const newMedicine = req.body
        await medicineRepositories.addMedicinToPatient(newMedicine)
        res.end()
    }

    async deleteMedicine(req : Request , res : Response){
        try {
            const medicineId = req.params.medicineId
            await medicineRepositories.removeMedicin(medicineId)
            res.send('medicine is deleted successufly')
        } catch (error) {
            res.status(404).send('An error occurred');
        }
    }

    async updateMedicine(req : Request , res : Response){
        try {
            const updatedMedicine = req.body
            const medicineId = req.params.medicineId
            
            await medicineRepositories.updateMedicin(updatedMedicine, medicineId)
            res.send('medicine is updated successufly')
        } catch (error) {
            res.status(404).send('An error occurred');
        }
        
    }
}