import { Router } from 'express';
import { MedicineController } from '../Controllers/medicine_controller'
import { DoctorController } from '../Controllers/doctor_controller'

const medicineController = new MedicineController()
const doctorController = new DoctorController()


const router = Router();

router.post('/addMedicine' , medicineController.addMedicinToPatient)
router.get('/:doctorId/patientsList' , doctorController.getDoctorPatients)


export = router;