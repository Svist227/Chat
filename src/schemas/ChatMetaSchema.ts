import * as z from "zod";
import { MemberInfoSchema } from "./MemberInfoSchema";


export const ChatMetaSchema = z.object({
      lastMessage: z.string(),
      membersInfo: z.record(z.string(), MemberInfoSchema),
      members: z.array(z.string()),
      updatedAt: z.any(),
      _localtime: z.date()

    })