"use server"

import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID,  DATABASE_ID, databases,   } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"

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

     revalidatePath('/admin')
     return parseStringify(updateAppointment)
   } catch (error) {
    console.log(error)
    }
}