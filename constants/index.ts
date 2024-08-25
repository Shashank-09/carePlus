import { describe } from "node:test";

export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

// export const Doctors = [
//   {
//     image: "/assets/images/dr-green.png",
//     name: "John Green",
//     description: "Dr. John Green is a renowned Cardiologist with over 15 years of experience in diagnosing and treating heart conditions. He is known for his compassionate care and commitment to patient wellness.",
//   },
//   {
//     image: "/assets/images/dr-cameron.png",
//     name: "Leila Cameron",
//     description: "Dr. Leila Cameron is an experienced Dermatologist specializing in skin disorders, cosmetic procedures, and skincare. She has a strong focus on personalized treatment plans to achieve the best outcomes.",
//   },
//   {
//     image: "/assets/images/dr-livingston.png",
//     name: "David Livingston",
//     description: "Dr. David Livingston is a highly skilled Gastroenterologist who focuses on digestive health, liver diseases, and endoscopic procedures. He has a reputation for providing thorough and precise care.",
//   },
//   {
//     image: "/assets/images/dr-peter.png",
//     name: "Evan Peter",
//     description: "Dr. Evan Peter is an expert Neurologist dedicated to the treatment of neurological disorders such as migraines, epilepsy, and Parkinson's disease. His research-driven approach ensures cutting-edge treatments.",
//   },
//   {
//     image: "/assets/images/dr-powell.png",
//     name: "Jane Powell",
//     description: "Dr. Jane Powell is an Oncologist with a specialization in breast and ovarian cancers. Her approach combines advanced medical treatments with compassionate support for patients and their families.",
//   },
//   {
//     image: "/assets/images/dr-remirez.png",
//     name: "Alex Ramirez",
//     description: "Dr. Alex Ramirez is a Pediatrician known for his gentle and reassuring approach to children's health. He covers a wide range of pediatric care, from routine check-ups to complex health issues.",
//   },
//   {
//     image: "/assets/images/dr-lee.png",
//     name: "Jasmine Lee",
//     description: "Dr. Jasmine Lee is a Psychiatrist who provides comprehensive mental health care, specializing in mood disorders, anxiety, and psychopharmacology. She is highly regarded for her empathetic and effective treatment strategies.",
//   },
//   {
//     image: "/assets/images/dr-cruz.png",
//     name: "Alyana Cruz",
//     description: "Dr. Alyana Cruz is a Rheumatologist with expertise in treating arthritis, autoimmune diseases, and chronic pain. She is committed to improving quality of life through innovative therapies and patient education.",
//   },
//   {
//     image: "/assets/images/dr-sharma.png",
//     name: "Hardik Sharma",
//     description: "Dr. Hardik Sharma is a Urologist specializing in urinary tract health, prostate issues, and male reproductive health. His patient-centered approach ensures comfort and trust in all aspects of care.",
//   },
// ];
export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
    description: "Cardiologist",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
    description: "Dermatologist",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
    description: "Gastroenterologist",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
    description: "Neurologist",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
    description: "Oncologist",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
    description: "Pediatrician",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
    description: "Psychiatrist",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
    description: "Rheumatologist",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
    description: "Urologist",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};