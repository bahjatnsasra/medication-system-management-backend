import { Router } from 'express';
import { PatientController } from '../Controllers/patient_controller'

const patientController = new PatientController()


const router = Router();

router.get('/:patientId/medications' , patientController.getPatientMedications)


export = router;