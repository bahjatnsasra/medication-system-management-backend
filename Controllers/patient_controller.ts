import { Request ,Response } from 'express';
import {PatientRepositories} from '../Repositories/patient_repositories'

const patientRepositories = new PatientRepositories()


export class PatientController {

    async getPatientMedications(req : Request , res : Response){
        const patientId = req.params.patientId
        const patients = await patientRepositories.getPatientMedicatons(patientId)
        res.status(200).send(patients)
        res.end()
    }

    async getAllPatients(req : Request , res : Response){
        try {
            const patients = await patientRepositories.getAllPatients()
            res.status(200).send(patients)
        } catch (error) {
            throw(error)
        }
    }


    async addPatientToDoctor(req : Request , res : Response){
        const newPatient = req.body
        await patientRepositories.addPatientToDoctor(newPatient)
        res.end()
    }

    async deletePatient(req : Request , res : Response){
        try {
            
            
            const patientId = req.params.patienId
            
            
            await patientRepositories.removePatient(patientId)
            res.send('patient is deleted successufly')
        } catch (error) {
            res.status(404).send('An error occurred');
        }
    }

    async updatePatient(req : Request , res : Response){
        try {
            const updatedPatient = req.body
            const patienId = req.params.patienId
            
            await patientRepositories.updatePatient(updatedPatient, patienId)
            res.send('patient is updated successufly')
        } catch (error) {
            res.status(404).send('An error occurred');
        }
        
    }
}