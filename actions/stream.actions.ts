"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecreteKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const tokenProvider = async () => {
    const user = await currentUser();
    if(!user) throw new Error("user is not logged in")
    if(!apiKey) throw new Error("apikey  not found")
    if(!apiSecreteKey) throw new Error("secrete key not found")
    const streamClient = new StreamClient(apiKey,apiSecreteKey);
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now()/1000) - 60;
   const token = streamClient.createToken(user.id, exp,issued);
    return token;
  };
  export default tokenProvider;