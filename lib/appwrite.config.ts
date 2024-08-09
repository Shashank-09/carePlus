import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66b2325b003994a61a87").setKey("41c6fa692a725cb7a8d4c1af8fd5eafc893195904a3ad68fff66441c4657e9e90cb3e1157c46c21b83381ecbfeca2efa96de673cd0f17c234ecb56aea41ee54e11e0c93114c0a866e6a1a0346887e290132a89116b14cb6c99303ae39f4291a60fa060b6f1d8828a5ba5af65a1971a6cc22c843cb3aeaebc386958dfdd05c867");

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);