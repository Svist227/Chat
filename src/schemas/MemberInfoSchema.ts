import * as z from "zod";

export const MemberInfoSchema = z.object({
      uid: z.string(),
      username: z.union([z.string(), z.null()]),
      photoURL: z.union([z.string(), z.null()])

    })