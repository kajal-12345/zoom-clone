"use client";
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/usegetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Table = ({title,description}:{title:string;description:string})=>{
return (
<div className='flex flex-col gap-2 items-start'>
<h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}:</h1>
<h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
</div>)
}

const PersonalRoom = () => {
  const {user} = useUser();
  const router = useRouter();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const {call} = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const startMeeting = async()=>{
    if(!client || !user) return;
    
    if(!call){
      const newCall = client.call('default',meetingId!);
      await newCall?.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
    
  }
  return (
    <section className='text-large flex text-white flex-col gap-10'>
        <h1 className='text-3xl  font-bold'>Personal Room</h1>
        <div className='w-full flex flex-col gap-8 xl:max-w-[900px]'>
          <Table description={`${user?.username}'s meeting room`} title='Topic'/>
          <Table description={`${meetingId!}`} title='Meetng Id'/>
          <Table description={`${meetingLink}`} title='Invite Link'/>
        </div>
        <div className='flex gap-2'>
          <Button className="bg-blue-1" onClick={startMeeting}>Start Meeting</Button>
          <Button
              onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
        </div>
    </section>
  )
}

export default PersonalRoom