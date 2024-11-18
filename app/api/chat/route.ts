import { openai } from "@ai-sdk/openai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import OpenAI from "openai";
import { streamText } from "ai";

const {
  OPENAI_API_KEY,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
} = process.env;

const openAi = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_ENDPOINT!, {
  namespace: ASTRA_DB_NAMESPACE,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    let docContext = "";

    // Create Embeddings
    const latestMessageEmbedding = await openAi.embeddings.create({
      input: latestMessage,
      model: "text-embedding-3-small",
      encoding_format: "float",
    });

    // Search for embedding
    const collection = await db.collection(ASTRA_DB_COLLECTION!);
    const cursor = await collection.find(
      {},
      {
        sort: {
          $vector: latestMessageEmbedding.data[0].embedding,
        },
        limit: 5,
        includeSimilarity: true,
      }
    );

    const documents = await cursor.toArray();
    const docsMap = await documents?.map((doc) => doc.text);
    docContext = JSON.stringify(docsMap);

    // Create a RAG Template
    const ragTemplate = { role: "system", content: "" };

    // const result = await streamText({
    //   model: openai("gpt-4-turbo"),
    //   messages: docsMap,
    // });
    // return new Response(result.toDataStreamResponse());
  } catch (error) {
    console.log("error gettng responses from db");
  }
}
