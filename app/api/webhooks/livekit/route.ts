import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import prisma from "@/lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
)

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayloads = headers();
  const authorization = headerPayloads.get("Authorization");
  if (!authorization) {
    return new Response("No authorization headers", { status: 400 });
  }

  const event = await receiver.receive(body, authorization);

  // stream end
  if (event.event === "ingress_ended") {
    await prisma.stream.update({
      where: { ingressId: event.ingressInfo?.ingressId },
      data: {
        isLive: false,
      }
    })
  }

  //stream start
  if (event.event === "ingress_started") {
    await prisma.stream.update({
      where: { ingressId: event.ingressInfo?.ingressId },
      data: {
        isLive: true,
      }
    })
  }
  return new Response('', { status: 200 })
}