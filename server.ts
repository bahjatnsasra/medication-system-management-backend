import express from 'express';
import managerApi from './Routes/manager_routes'
import doctorApi from './Routes/doctor_routes'
import patientApi from './Routes/patient_routes'

import 'dotenv/config'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/manager',managerApi)
app.use('/doctor',doctorApi)
app.use('/patient',patientApi)


const port = process.env.PORT 
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});