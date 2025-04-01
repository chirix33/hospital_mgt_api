import express, { Request, Response, RequestHandler } from 'express';
import { Doctor, Patient, Appointment, Prescription, Clinic, Department } from "../../lib/interfaces";
import { Handler } from '@netlify/functions';
import serverless from 'serverless-http';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import { specs } from '../../src/swagger';
import path from 'path';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
    res.render('index');
});

// Copy all your routes from src/index.ts here
// Make sure to use _req for unused request parameters
// Doctor Routes
/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 */
app.get("/doctors", (async (req: Request, res: Response) => {
    const doctors = await prisma.doctors.findMany({
      include: {
        department: true,
        departmentHead: true,
      },
    });
    res.json(doctors);
  }) as RequestHandler);
  
  /**
   * @swagger
   * /doctors/{id}:
   *   get:
   *     summary: Get a doctor by ID
   *     tags: [Doctors]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Doctor ID
   *     responses:
   *       200:
   *         description: Doctor found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Doctor'
   *       404:
   *         description: Doctor not found
   */
  app.get("/doctors/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    const doctor = await prisma.doctors.findUnique({
      where: { id: Number(id) },
      include: {
        department: true,
        departmentHead: true,
        appointments: true,
        prescriptions: true,
        doctorClinics: {
          include: {
            clinic: true,
          },
        },
      },
    });
    if (!doctor) res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  }) as RequestHandler);
  
  /**
   * @swagger
   * /doctors:
   *   post:
   *     summary: Create a new doctor
   *     tags: [Doctors]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Doctor'
   *     responses:
   *       201:
   *         description: Doctor created successfully
   *       400:
   *         description: Invalid input
   */
  app.post("/doctors", (async (req: Request, res: Response) => {
    const doctorData: Doctor = req.body;
    try {
      const doctor = await prisma.doctors.create({
        data: doctorData,
        include: {
          department: true,
        },
      });
      res.status(201).json(doctor);
    } catch (error) {
      res.status(400).json({ error: "Failed to create doctor" });
    }
  }) as RequestHandler);
  
  app.put("/doctors/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    const doctorData: Doctor = req.body;
    try {
      const doctor = await prisma.doctors.update({
        where: { id: Number(id) },
        data: doctorData,
        include: {
          department: true,
        },
      });
      res.json(doctor);
    } catch (error) {
      res.status(400).json({ error: "Failed to update doctor" });
    }
  }) as RequestHandler);
  
  app.delete("/doctors/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.doctors.delete({ where: { id: Number(id) } });
      res.json({ message: "Doctor deleted" });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete doctor" });
    }
  }) as RequestHandler);
  
  // Patient Routes
  /**
   * @swagger
   * /patients:
   *   get:
   *     summary: Get all patients
   *     tags: [Patients]
   *     responses:
   *       200:
   *         description: List of patients
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Patient'
   */
  app.get("/patients", (async (req: Request, res: Response) => {
    const patients = await prisma.patients.findMany();
    res.json(patients);
  }) as RequestHandler);
  
  app.get("/patients/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await prisma.patients.findUnique({
      where: { id: Number(id) },
      include: {
        appointments: true,
        prescriptions: true,
      },
    });
    if (!patient) res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  }) as RequestHandler);
  
  /**
   * @swagger
   * /patients:
   *   post:
   *     summary: Create a new patient
   *     tags: [Patients]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Patient'
   *     responses:
   *       201:
   *         description: Patient created successfully
   *       400:
   *         description: Invalid input
   */
  app.post("/patients", (async (req: Request, res: Response) => {
    const patientData: Patient = req.body;
    try {
      const patient = await prisma.patients.create({
        data: patientData,
      });
      res.status(201).json(patient);
    } catch (error: any) {
      console.error('Error creating patient:', error);
      res.status(400).json({ 
        error: "Failed to create patient",
        details: error.message 
      });
    }
  }) as RequestHandler);
  
  app.put("/patients/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    const patientData: Patient = req.body;
    try {
      const patient = await prisma.patients.update({
        where: { id: Number(id) },
        data: patientData,
      });
      res.json(patient);
    } catch (error) {
      res.status(400).json({ error: "Failed to update patient" });
    }
  }) as RequestHandler);
  
  app.delete("/patients/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.patients.delete({ where: { id: Number(id) } });
      res.json({ message: "Patient deleted" });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete patient" });
    }
  }) as RequestHandler);
  
  // Appointment Routes
  /**
   * @swagger
   * /appointments:
   *   get:
   *     summary: Get all appointments
   *     tags: [Appointments]
   *     responses:
   *       200:
   *         description: List of appointments
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appointment'
   */
  app.get("/appointments", (async (req: Request, res: Response) => {
    const appointments = await prisma.appointments.findMany({
      include: {
        doctor: true,
        patient: true,
      },
    });
    res.json(appointments);
  }) as RequestHandler);
  
  /**
   * @swagger
   * /appointments:
   *   post:
   *     summary: Create a new appointment
   *     tags: [Appointments]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Appointment'
   *     responses:
   *       201:
   *         description: Appointment created successfully
   *       400:
   *         description: Invalid input
   */
  app.post("/appointments", (async (req: Request, res: Response) => {
    const appointmentData: Appointment = req.body;
    try {
      const appointment = await prisma.appointments.create({
        data: appointmentData,
        include: {
          doctor: true,
          patient: true,
        },
      });
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: "Failed to create appointment" });
    }
  }) as RequestHandler);
  
  // Prescription Routes
  app.get("/prescriptions", (async (req: Request, res: Response) => {
    const prescriptions = await prisma.prescriptions.findMany({
      include: {
        doctor: true,
        patient: true,
      },
    });
    res.json(prescriptions);
  }) as RequestHandler);
  
  app.post("/prescriptions", (async (req: Request, res: Response) => {
    const prescriptionData: Prescription = req.body;
    try {
      const prescription = await prisma.prescriptions.create({
        data: prescriptionData,
        include: {
          doctor: true,
          patient: true,
        },
      });
      res.status(201).json(prescription);
    } catch (error) {
      res.status(400).json({ error: "Failed to create prescription" });
    }
  }) as RequestHandler);
  
  // Clinic Routes
  app.get("/clinics", (async (req: Request, res: Response) => {
    const clinics = await prisma.clinics.findMany({
      include: {
        doctorClinics: {
          include: {
            doctor: true,
          },
        },
      },
    });
    res.json(clinics);
  }) as RequestHandler);
  
  app.post("/clinics", (async (req: Request, res: Response) => {
    const clinicData: Clinic = req.body;
    try {
      const clinic = await prisma.clinics.create({
        data: clinicData,
      });
      res.status(201).json(clinic);
    } catch (error) {
      res.status(400).json({ error: "Failed to create clinic" });
    }
  }) as RequestHandler);
  
  // Department Routes
  /**
   * @swagger
   * /departments:
   *   get:
   *     summary: Get all departments
   *     tags: [Departments]
   *     responses:
   *       200:
   *         description: List of departments
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Department'
   */
  app.get("/departments", (async (req: Request, res: Response) => {
    const departments = await prisma.departments.findMany({
      include: {
        headDoctor: true,
        doctors: true,
      },
    });
    res.json(departments);
  }) as RequestHandler);
  
  app.get("/departments/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    const department = await prisma.departments.findUnique({
      where: { id: Number(id) },
      include: {
        headDoctor: true,
        doctors: true,
      },
    });
    if (!department) res.status(404).json({ error: "Department not found" });
    res.json(department);
  }) as RequestHandler);
  
  /**
   * @swagger
   * /departments:
   *   post:
   *     summary: Create a new department
   *     tags: [Departments]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Department'
   *     responses:
   *       201:
   *         description: Department created successfully
   *       400:
   *         description: Invalid input
   */
  app.post("/departments", (async (req: Request, res: Response) => {
    const departmentData: Department = req.body;
    try {
      const department = await prisma.departments.create({
        data: departmentData,
        include: {
          headDoctor: true,
        },
      });
      res.status(201).json(department);
    } catch (error) {
      res.status(400).json({ error: "Failed to create department" });
    }
  }) as RequestHandler);
  
  /**
   * @swagger
   * /departments/{id}:
   *   put:
   *     summary: Update a department
   *     tags: [Departments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Department ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Department'
   *     responses:
   *       200:
   *         description: Department updated successfully
   *       400:
   *         description: Invalid input
   *       404:
   *         description: Department not found
   */
  app.put("/departments/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    const departmentData: Department = req.body;
    try {
      const department = await prisma.departments.update({
        where: { id: Number(id) },
        data: departmentData,
        include: {
          headDoctor: true,
          doctors: true,
        },
      });
      res.json(department);
    } catch (error) {
      res.status(400).json({ error: "Failed to update department" });
    }
  }) as RequestHandler);
  
  app.delete("/departments/:id", (async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.departments.delete({ where: { id: Number(id) } });
      res.json({ message: "Department deleted" });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete department" });
    }
  }) as RequestHandler);
  
  // Doctor-Clinic Association Routes
  app.post("/doctor-clinics", (async (req: Request, res: Response) => {
    const { doctorId, clinicId, consultationDays, consultationHours } = req.body;
    try {
      const doctorClinic = await prisma.doctor_clinics.create({
        data: {
          doctorId: Number(doctorId),
          clinicId: Number(clinicId),
          consultationDays,
          consultationHours,
        },
        include: {
          doctor: true,
          clinic: true,
        },
      });
      res.status(201).json(doctorClinic);
    } catch (error) {
      res.status(400).json({ error: "Failed to associate doctor with clinic" });
    }
  }) as RequestHandler);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Export the serverless handler
const handler = serverless(app);
export { handler };