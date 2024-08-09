'use clent'

import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control, Form } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { render } from "react-dom"
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select"


interface  CustomPropes {
    control: Control<any>,
    fieldType: FormFieldType,
    name : string,
    label? : string,
    placeholder? : string,
    iconSrc? : string,
    iconAlt? : string,
    disabled? : boolean,
    dateFormate? : string,
    showTimeSelect? : boolean,
    children? : React.ReactNode,
    renderSkeleton? : (filed: any ) =>  React.ReactNode, 
}
  

const RenderField =  ({field, props} : {field : any;  props: CustomPropes}) =>  {
  const { fieldType , iconAlt ,  iconSrc , placeholder , showTimeSelect, dateFormate, renderSkeleton} = props
   switch (fieldType) {
    case FormFieldType.INPUT:
     return(
      <div className="flex rounded-md border border-dark-500">
         {iconSrc && (
          <Image 
           src={iconSrc}
           height={24}
           width={24}
           alt={iconAlt || 'icon'}
           className="ml-2"
          />
         )}
         <FormControl>
          <Input 
           placeholder={placeholder}
           {...field}
           className="shad-input border-0"
          />
         </FormControl>
      </div>
     )  
     case FormFieldType.PHONE_INPUT : 
     return(
      <FormControl>
          <PhoneInput 
            defaultCountry="IN"
            placeholder={placeholder}
            international 
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
      </FormControl>
     )
     case FormFieldType.DATE_PICKER:
      return(
        <div className="flex rounded-md border-b-dark-500 bg-dark-400">
          <Image 
           src="/assets/icons/calendar.svg"
           height={24}
           width={24}
           alt="calendar"
           className="ml-2"
          />
          <FormControl>
              <DatePicker  selected={field.value} 
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormate ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              />
          </FormControl>
        </div>
    )
    case FormFieldType.SELECT: 
    return(
       <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
         <FormControl >
           <SelectTrigger className="shad-select-trigger">
           <SelectValue placeholder={placeholder} />
           </SelectTrigger>
         </FormControl>
         <SelectContent className="shad-select-content">
              {props.children}
         </SelectContent>
        </Select>
       </FormControl>
    )
    case FormFieldType.SKELEON:
      return renderSkeleton ? renderSkeleton(field) : null
     
    default:
      break;
   }
}


const CustomFormField = ( props : CustomPropes) => {
  const {control , fieldType , name , label} = props;
  return (
            <FormField
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType  !== FormFieldType.CHECKBOX && label &&  (
                        <FormLabel>{label}</FormLabel>
                    )}

                <RenderField 
                   field={field}  props={props}
                />
                <FormMessage className="shad-error" />
                </FormItem>
              )}
            />
  )
}

export default CustomFormField