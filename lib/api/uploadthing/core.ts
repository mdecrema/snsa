// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  // Puoi definire quanti endpoint vuoi (es. "imageUploader", "adminUploader", ecc.)
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Opzionale: qui puoi inserire un controllo di autenticazione per assicurarti 
      // che solo gli admin possano caricare immagini nella dashboard.
      
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completato per l'utente:", metadata.userId);
      console.log("URL pubblico del file:", file.ufsUrl);

      // Qui puoi anche salvare l'URL direttamente nel database se desideri
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;