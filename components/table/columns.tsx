"use client";

import { ColumnDef } from "@tanstack/react-table";

import { StatusBadge } from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppoinmentModal from "../AppoinmentModal";
import { Appointment } from "@/types/appwrite.types";
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "scheduled" | "cancelled";
  email: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    // header: "Patient",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    
    accessorFn: (row) => row.patient.name, 
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => (
      <p className="text-14-regular">{row.original.patient.phone}</p>
    ),

  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="text-14-regular">{row.original.patient.email}</p>
    ),
  },
  {
    accessorKey: 'reason',
    header: "Reason",
    cell: ({ row }) => (
      <p className="text-14-regular">{row.original.reason}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },

  {
    accessorKey: "scheduled",
    header: "Appoinment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image || ''}
            alt={doctor?.name || ''}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">
      Actions
    </div>,
    cell: ({ row: {original : data} }) => {
      return(
        <div className="flex gap-1">
          <AppoinmentModal 
          type="schedule"
           patientId={data.patient.$id}
           userId = {data.userId}
           appointment = {data}
          />
          <AppoinmentModal 
           type="cancel"
           patientId={data.patient.$id}
           userId = {data.userId}
           appointment = {data}
          />
          
        </div>
      )
      
    },
  },
];
