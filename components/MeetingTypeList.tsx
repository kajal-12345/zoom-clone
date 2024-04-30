"use client";
import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast";
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isJoiningMeeting' | 'isScheduleMeeting' | 'isInstantMeeting' | undefined>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    link: '',
    description: ''
  });
  
  const { toast } = useToast();
  const [callDetails, setCallDetails] = useState<Call>();
  const router = useRouter();
  const user = useUser();
  const client = useStreamVideoClient();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  const createMeeting = async () => {
    if (!client || !user) {
      return;
    }
    // console.log("user",user)
    try {
      if(!values.dateTime){
        toast({
          title: "please select date and time"
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error("Failed to create call")
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const desc = values.description || 'instant Meeting';
     await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: desc
          }
        }
      }).catch((error)=>toast({
        title: "Failed to create meeting"
      }))
      setCallDetails(call)
      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title: "Meeting Created"
      })
    } catch (error) {
      toast({
        title:"Failed to create meeting"
      })
    }
  };
  return (
    <section className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant Meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your Meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Checkout your Recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-yellow-1"
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date:Date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>): (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      ) }
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList