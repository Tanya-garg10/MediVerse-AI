import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
});

const PredictInput = z.object({
  symptoms: z.string().min(3).max(1000),
});

export type ChatReply = {
  text: string;
  sources: { title: string; url: string }[];
  demo: boolean;
  note?: string;
};

export type Prediction = {
  conditions: { name: string; risk: number; why: string }[];
  advice: string;
  sources: { title: string; url: string }[];
  demo: boolean;
  note?: string;
};

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ChatInput.parse(data))
  .handler(async ({ data }): Promise<ChatReply> => {
    const { runAssistant } = await import("./ai.server");
    return runAssistant(data.messages);
  });

export const predictDisease = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => PredictInput.parse(data))
  .handler(async ({ data }): Promise<Prediction> => {
    const { runPrediction } = await import("./ai.server");
    return runPrediction(data.symptoms);
  });
