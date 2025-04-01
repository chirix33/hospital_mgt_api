// Types
export interface Doctor {
    name: string;
    email: string;
    phone: string;
    specialization: string;
    departmentId?: number;
}
  
export interface Patient {
    name: string;
    dob: Date;
    phone: string;
    email?: string;
    address: string;
    emergencyContact: string;
    emergencyPhone: string;
}
  
export interface Appointment {
    doctorId: number;
    patientId: number;
    appointmentDate: Date;
    diagnosis?: string;
    treatmentPlan?: string;
}
  
export interface Prescription {
    patientId: number;
    doctorId: number;
    medicationName: string;
    dosage: string;
    frequency: string;
    prescriptionDate: Date;
    prescriptionEndDate?: Date;
}
  
export interface Clinic {
    name: string;
    address: string;
    phone: string;
}
  
export interface Department {
    name: string;
    location: string;
    headDoctorId?: number;
}

export interface Drug {
    name: string;
    limit?: number;
}