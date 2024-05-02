import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  // console.log("home")
  const now = new Date();
  const months = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
  // const hour =  now.getHours()-12;
  // const minute = now.getMinutes();
  // const formathour = hour.toString().length > 1 ? `${hour}` :`0${hour}`;
  // const formatMin =  minute.toString().length > 1 ? `${minute}` : `0${minute}`;
  // const formatTime = formathour + ":" +formatMin;

  // const formatdate = new Intl.DateTimeFormat('en-IN',{dateStyle:'full'}).format(now);
  const time = now.toLocaleTimeString("en-Us", { hour: '2-digit', minute: '2-digit' })
  const date = days.at(now.getDay()) + ", " + now.getDate() + "  " + months.at(now.getMonth()) + "  " + now.getFullYear()
  return (
    <section className='text-large flex text-white  flex-col gap-10 size-full'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1'>
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home
