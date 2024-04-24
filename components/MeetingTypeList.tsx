/* eslint-disable camelcase */
"use client";
import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isJoiningMeeting' | 'isScheduleMetting' | 'isInstantMeeting' | undefined>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    link: '',
    description: ''
  })
  const [callDetails, setCallDetails] = useState<Call>();
  const router = useRouter();
  const user = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) {
      return;
    }
    // console.log("user",user)
    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      console.log("first")
      if (!call) throw new Error("Failed to create call")
      console.log("second")
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const desc = values.description || 'instant Meeting';
      console.log("third")
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: desc
          }
        }
      }).catch((err)=>console.log(err))
  
      setCallDetails(call)
      if (!values.description) {
        console.log("in")
        router.push(`/meeting/${call.id}`)
      }
    } catch (error) {
      console.log(error)
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
        handleClick={() => setMeetingState('isScheduleMetting')}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Checkout your Recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-yellow-1"
      />
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