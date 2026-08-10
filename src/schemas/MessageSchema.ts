import * as z from "zod";
import { Timestamp } from "firebase/firestore"


export const RawMessageSchema = z.object({
    id: z.string(),
    text: z.string(),
    senderId: z.string(),
    createdAt: z.instanceof(Timestamp)
})
