"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { createViewToken } from "@/actions/token";

export const useViewerToken = (hostId: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewToken = await createViewToken(hostId);
        setToken(viewToken);

        const decodedToken = jwtDecode(viewToken) as JwtPayload & { name?: string }
        console.log(decodedToken,'decodedToken')
        const name = decodedToken.name;
        const identity = decodedToken.iss;

        if (identity) setIdentity(identity)

        if (name) setName(name);
      } catch {
        toast.error("Something went wrong!");
      }
    }
    createToken();
  }, [])
  
  return {
    token,
    name,
    identity,
  }
}