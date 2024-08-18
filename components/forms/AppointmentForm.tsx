"use client";

import { useState } from "react";
import { Form } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "./PatientForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../SubmitButton";
import { getAppointmentSchema } from "@/lib/validation";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { useRouter } from "next/navigation";
import { Appointment } from "@/types/appwrite.types";
import { scheduler } from "timers/promises";
import { newDate } from "react-datepicker/dist/date_utils";

const AppointmentForm = ({ type , userId , patientId , appointment , setOpen} : {
  type : 'create' | 'cancel' | 'schedule',
  userId : string,
  patientId : string,
  appointment? : Appointment,
  setOpen : (open : boolean) => void
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment.schedule) :  new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note:  appointment?.note || "",
      cancellationReason:  appointment?.cancellationReason || "",
    },
  });

  console.log({
    type , userId , patientId , appointment
  })

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    console.log('Submitting', {type});
    setIsLoading(true);
    let status;

    switch (type) {
      case 'schedule':
        status = 'scheduled'
        break;
      case 'cancel':
        status = 'cancelled'
          break;
      default:
        status = 'pending'
        break;
    }
    try {
      if(type === 'create' && patientId){
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule), 
          reason: values.reason!,
          note: values.note,
          status: status as Status
        }
        const  appointment =  await createAppointment(appointmentData);

        if(appointment){
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id} `)
        }
      }else{
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule : new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason
          },
          type
        }
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if(updatedAppointment){
         setOpen && setOpen(false);
         form.reset();
        }
      }

    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }

  let buttonLable;
  switch (type) {
    case 'cancel':
       buttonLable = 'Cancel Appointment'
      break;
   case  'create': 
      buttonLable  = 'Request Appointment'
      break;
    case 'schedule': 
      buttonLable = 'Schedule Appointment'
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        { type === 'create' &&<section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 second.
          </p>
        </section>}

        {type !== "cancel" && (
          <>
           <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

      
        <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormate="dd/MM/yyyy  -  h:mm aa"
            />


        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Reason for Appointment"
            name="reason"
            placeholder="ex. Annual monthly checkup"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Notes"
            name="note"
            placeholder="Preferred afternoon appointments, if possible"
          />
        </div>

        
           
          </>
        )}

         {type === "cancel" && (
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              label="Reason for Cancelling"
              name="cancellationReason"
              placeholder="ex. Not feeling well"
              />
         )}

      

        <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLable}</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
