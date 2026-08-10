import { Message } from "@/types/message";

export function isMessage(message: Message | null): message is Message{
    return message !== null
} 