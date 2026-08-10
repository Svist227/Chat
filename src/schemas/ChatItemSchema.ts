import * as z from "zod";
import { MemberInfoSchema } from "./MemberInfoSchema";

export const ChatItemSchema = z.object({
    chatId: z.string(),
    otherUser: MemberInfoSchema,
    lastMessage: z.string(),
    time: z.union([z.string(), z.null()])
})

export type ChatItem = z.infer<typeof ChatItemSchema>
