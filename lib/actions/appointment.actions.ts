"use server"

import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID,  DATABASE_ID, databases, messaging, PATIENT_COLLECTION_ID,   } from "../appwrite.config"
import { formatDateTime, parseStringify } from "../utils"
import { Appointment, Patient } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"
import { users } from "../appwrite.config"


export const createAppointment = async (appointment : CreateAppointmentParams) => {
    try {
        const newAppointment  = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment

        )
        return parseStringify(newAppointment)
    } catch (error) {
       console.log(error) 
    }
   }

export const getAppointment = async (appointmentId : string) => {
    try {
    const appointment =  await databases.getDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId
    )
    return parseStringify(appointment)
    } catch (error) {
        console.log(error)
    }
}

export const getRecentAppointmentList = async () => {
  try {
     const appointment = await databases.listDocuments(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        [Query.orderDesc('$createdAt')]
     )
    const initialsCounts = {
        scheduledCount : 0,
        pendingCount : 0,
        cancelledCount : 0
    }

    const counts = (appointment.documents as Appointment[]).reduce((acc, appointment) => {
      if(appointment.status === 'scheduled') {
          acc.scheduledCount += 1
      }
      if(appointment.status === 'pending') {
          acc.pendingCount += 1
      }
      if(appointment.status === 'cancelled') {
          acc.cancelledCount += 1
      }
      return acc; 
    }, initialsCounts)
    
    const data = {
        totalCount : appointment.total,
        ...counts,
        documents : appointment.documents
    }
    
    return parseStringify(data)

  } catch (error) {
     console.log(error)
  }
}


export const updateAppointment = async ( {appointmentId , userId , appointment , type } : UpdateAppointmentParams) => {
   try {
     const updateAppointment = await databases.updateDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment
     )
     if(!updateAppointment){
        throw Error('Failed to update appointment')
     }
     //sms notification
    const smsMessage = `
    Hi, it's CarePlus
    ${type === 'schedule' ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician} ` : `Your appointment has been cancelled for the following Reason: ${appointment.cancellationReason}`}
    `
    await sendSMSNotification(userId, smsMessage)

     revalidatePath('/admin')
     return parseStringify(updateAppointment)
   } catch (error) {
    console.log(error)
    }
}


export const sendSMSNotification = async ( userId: string, content: string ) => {
  try {
    const message = await messaging.createSms(
        ID.unique(),
        content,
        [],
        [userId]
    )
    return parseStringify(message)
  } catch (error) {
    console.log(error)
    
  }
}


// export const sendSMSNotification = async (userId: string, content: string ) => {
//   try {
//     console.log("Sending SMS notification to user:", userId);
//     const user = await users.get(userId);

//     // Fetch the patient data associated with the userId
//     const patientDocuments = await databases.listDocuments<Patient>(
//       DATABASE_ID!,
//       PATIENT_COLLECTION_ID!,
//       [Query.equal("userId", userId)]
//     );

//     // Assuming the query returns a list, take the first matching patient document
//     const patient = patientDocuments.documents[0]; // Assumes only one patient per userId

//     // Check if a patient document exists
//     if (!patient) {
//       throw new Error("No patient found for this userId.");
//     }

//     // Extract the phone number and emergency contact number
//     const phoneNumber = patient.phone;
//     const emergencyContactNumber = patient.emergencyContactNumber;

//     if (!phoneNumber && !emergencyContactNumber) {
//       throw new Error("Neither the patient nor the emergency contact has a phone number.");
//     }

//     const recipients = [];
//     if (phoneNumber) recipients.push(phoneNumber);
//     if (emergencyContactNumber) recipients.push(emergencyContactNumber);
    
//     console.log({recipients});
//     // Send the SMS to both numbers
//     const message = await messaging.createSms(
//       ID.unique(),
//       content,
//       [],
//       recipients // Use recipients array here, which contains phone numbers
//     );

//     return parseStringify(message);
//   } catch (error) {
//     console.log("Error sending SMS:", error);
//     throw error; // Rethrow error to handle it elsewhere if needed
//   }
// };


