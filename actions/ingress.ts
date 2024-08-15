"use server"

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import prisma from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

const apiurl = process.env.LIVEKIT_API_URL!;
const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;
const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!;

const ingressClient = new IngressClient(apiurl, apiKey, apiSecret);

const roomService = new RoomServiceClient(
  wsUrl,
  apiKey,
  apiSecret
)

export const resetIngress = async (host: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: host,
  })

  const rooms = await roomService.listRooms([host]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
}

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  await resetIngress(self.id)

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } 

  const ingress = await ingressClient.createIngress(
    ingressType,
    options
  )

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  await prisma.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  })

  revalidatePath(`/u/${self.username}/keys`);
  return JSON.parse(JSON.stringify(ingress));
}