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
        Pharmacy: {
          type: 'object',
          properties: {
            meta: {
              type: 'object',
              properties: {
                disclaimer: { type: 'string' },
                terms: { type: 'string' },
                license: { type: 'string' },
                last_updated: { type: 'string', format: 'date' },
                results: {
                  type: 'object',
                  properties: {
                    skip: { type: 'integer' },
                    limit: { type: 'integer' },
                    total: { type: 'integer' }
                  }
                }
              }
            },
            results: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  spl_product_data_elements: { type: 'array', items: { type: 'string' } },
                  active_ingredient: { type: 'array', items: { type: 'string' } },
                  purpose: { type: 'array', items: { type: 'string' } },
                  indications_and_usage: { type: 'array', items: { type: 'string' } },
                  keep_out_of_reach_of_children: { type: 'array', items: { type: 'string' } },
                  warnings: { type: 'array', items: { type: 'string' } },
                  dosage_and_administration: { type: 'array', items: { type: 'string' } },
                  other_safety_information: { type: 'array', items: { type: 'string' } },
                  inactive_ingredient: { type: 'array', items: { type: 'string' } },
                  package_label_principal_display_panel: { type: 'array', items: { type: 'string' } },
                  set_id: { type: 'string' },
                  id: { type: 'string' },
                  effective_time: { type: 'string' },
                  version: { type: 'string' },
                  openfda: { type: 'object' }
                }
              }
            }
          }
        }
      },
    },
  },
  apis: ['./src/index.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options); 