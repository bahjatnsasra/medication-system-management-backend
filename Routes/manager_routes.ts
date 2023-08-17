import { Router } from 'express';
import { PatientController } from '../Controllers/patient_controller'
import { MedicineController } from '../Controllers/medicine_controller'
import { DoctorController } from '../Controllers/doctor_controller'
const patientController = new PatientController()
const medicineController = new MedicineController()
const doctorController = new DoctorController()

const router = Router();

router.get('/patients', patientController.getAllPatients)
router.post('/addPatient' , patientController.addPatientToDoctor)
router.delete('/deletePatient/:patienId' , patientController.deletePatient)
router.put('/updatePatient/:patienId' , patientController.updatePatient)

router.delete('/deleteMedicine/:medicineId' , medicineController.deleteMedicine)
router.put('/updateMedicine/:medicineId' , medicineController.updateMedicine)

router.get('/doctorsList' , doctorController.getDoctors)
router.post('/addDoctor' , doctorController.addDoctor)
router.delete('/deleteDoctor/:doctorId' , doctorController.deleteDoctor)
router.put('/updateDoctor/:doctorId' , doctorController.updateDoctor)



export = router;