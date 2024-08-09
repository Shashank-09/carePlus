"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "../ui/label";
import {  SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);

      console.log({ userData });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Full Name"
          name="name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="JohnDoe@xyz.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            placeholder="JohnDoe@xyz.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELEON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem 
                         value={option}
                         id={option}
                        />
                        <Label htmlFor={option} className="cursor-pointer">
                           {option}
                        </Label>
                      </div>
                    ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Address"
          name="address"
          placeholder="14 street, Indore"
          
        />
         <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Occupation"
          name="occupation"
          placeholder="Software Engineer"
          
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emargencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactPhone"
            label="Emergency conatact number"
            placeholder="(555) 123-4567"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem 
              key={doctor.name}
              value={doctor.name}
              >
               <div className="flex cursor-pointer items-center gap-2">
                 <Image
                   src={doctor.image}
                   height={32}
                   width={32}
                   alt={doctor.name} 
                   className="rounded-full border border-dark-500"
                 />
                 <p>{doctor.name}</p>
               </div>

             </SelectItem>
            ))}
          </CustomFormField>


        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Insurance Provider"
          name="insuranceProvider"
          placeholder="BlueCross Blue Shield"
          
        />
         <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Insurance policy number"
          name="insurancePolicyNumber"
          placeholder="ABC123456789"
          
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          label="Allergies (if any)" 
          name="allergies"
          placeholder="Peanuts, Pollen, etc."
          
        />
         <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          label="Current Medications (if any)" 
          name="currentMedications"
          placeholder="Ibuprofen 200mg, Paracetamol 500mg, etc."
          
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          label="Family Medical History" 
          name="familyMedicalHistory"
          placeholder="Diabetes, Hypertension, etc."
          
        />
         <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          label="Past Medical History" 
          name="pastMediaclHistory"
          placeholder="Asthma, Heart Attack, etc."
          
        />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Varification</h2>
          </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select an identification type"
          >
            {IdentificationTypes.map((identification) => (
              <SelectItem 
              key={identification}
              value={identification}
              >
               {identification}
             </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="1234567890"
          />

<CustomFormField
            fieldType={FormFieldType.SKELEON}
            control={form.control}
            name="identificationDocument"
            label="Scan copy of identification document"
            renderSkeleton={(field) => (
              <FormControl>
                 <FileUploader />
              </FormControl>
            )}
          />

        <div className="flex flex-col gap-6 xl:flex-row">
        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
