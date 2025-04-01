import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare Management API',
      version: '1.0.0',
      description: 'API documentation for Healthcare Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Doctor: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            specialization: { type: 'string' },
            departmentId: { type: 'integer', nullable: true },
          },
          required: ['name', 'email', 'phone', 'specialization'],
        },
        Patient: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            dob: { type: 'string', format: 'date-time' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email', nullable: true },
            address: { type: 'string' },
            emergencyContact: { type: 'string' },
            emergencyPhone: { type: 'string' },
          },
          required: ['name', 'dob', 'phone', 'address', 'emergencyContact', 'emergencyPhone'],
        },
        Appointment: {
          type: 'object',
          properties: {
            doctorId: { type: 'integer' },
            patientId: { type: 'integer' },
            appointmentDate: { type: 'string', format: 'date-time' },
            diagnosis: { type: 'string', nullable: true },
            treatmentPlan: { type: 'string', nullable: true },
          },
          required: ['doctorId', 'patientId', 'appointmentDate'],
        },
        Prescription: {
          type: 'object',
          properties: {
            patientId: { type: 'integer' },
            doctorId: { type: 'integer' },
            medicationName: { type: 'string' },
            dosage: { type: 'string' },
            frequency: { type: 'string' },
            prescriptionDate: { type: 'string', format: 'date-time' },
            prescriptionEndDate: { type: 'string', format: 'date-time', nullable: true },
          },
          required: ['patientId', 'doctorId', 'medicationName', 'dosage', 'frequency', 'prescriptionDate'],
        },
        Department: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            location: { type: 'string' },
            headDoctorId: { type: 'integer', nullable: true },
          },
          required: ['name', 'location'],
        },
        Clinic: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            phone: { type: 'string' },
          },
          required: ['name', 'address', 'phone'],
        },
        DoctorClinic: {
          type: 'object',
          properties: {
            doctorId: { type: 'integer' },
            clinicId: { type: 'integer' },
            consultationDays: { type: 'string' },
            consultationHours: { type: 'string' },
          },
          required: ['doctorId', 'clinicId', 'consultationDays', 'consultationHours'],
        },
      },
    },
  },
  apis: ['./src/index.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options); 