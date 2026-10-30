import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "../app/api/uploadthing/core";

export function getLocalizedField(
  jsonField: Record<string, string> | any,
  locale: string,
  fallback = 'en'
): string {
  if (!jsonField || typeof jsonField !== 'object') return '';
  return jsonField[locale] || jsonField[fallback] || '';
}

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();