import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { error } from "console";
import { useEffect, useState } from "react"

export const useGetCallById = (id:string | string[])=>{
const [call,setIsCall] = useState<Call>();
const [isCallLoading,setIsCallLoading] = useState(true)
const client = useStreamVideoClient();
 useEffect(() => {
  if(!client) return;

const loadcall = async()=>{
const {calls} = await client.queryCalls({
    filter_conditions:{
        id
    }
});
if(calls.length > 0){
    setIsCall(calls[0]);
}
setIsCallLoading(false)
}
 loadcall()
}, [client,id])
return {call,isCallLoading};
}