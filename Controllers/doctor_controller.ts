import { Request ,Response } from 'express';
import { DoctorRepositories } from '../Repositories/doctor_repositories'

const doctorRepositories = new DoctorRepositories()


export class DoctorController {

    async getDoctors(req : Request , res : Response){
        const doctors = await doctorRepositories.getAllDoctors()
        res.status(200).send(doctors)
        res.end()
    }


    async getDoctorPatients(req : Request , res : Response){
        const doctorId = req.params.doctorId
        console.log(doctorId);
        
        const doctorPatients = await doctorRepositories.getDoctorPatients(doctorId)
        res.status(200).send(doctorPatients)
        res.end()
    }

    async addDoctor(req : Request , res : Response){
        const newDoctor = req.body
        await doctorRepositories.createDoctor(newDoctor)
        res.end()
    }

    async deleteDoctor(req : Request , res : Response){
        try {
            const doctorId = req.params.doctorId
            await doctorRepositories.removeDoctor(doctorId)
            res.send('doctor is deleted successufly')
        } catch (error) {
            res.status(404).send('An error occurred');
        }
    }

    async updateDoctor(req : Request , res : Response){
        try {
            const updatedDoctor = req.body
            const doctorId = req.params.doctorId
            
            await doctorRepositories.updateDoctor(updatedDoctor, doctorId)
            res.send('doctor is updated successufly')
        } catch (error) {
            res.status(404).send('An error occurred');
        }
        
    }
}