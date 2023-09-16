import React, { useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import img from  './images/icon.png';
import './Cal.css';

function Cal() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const navigate = useNavigate();

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    });
    if (error) {
      alert('Error logging in to Google provider with Supabase');
      console.log(error);

    } else {
       navigate('/', { replace: true });

    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log('Creating calendar event');
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + session.provider_token,
      },
      body: JSON.stringify(event),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert('Event created, check your Google Calendar!');
      });
  }

  return (
    <div className="cal-container">
      <style>
        {`
          .cal-container {
            height: 100vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background-image: url('https://www.wallpapertip.com/wmimgs/49-493241_college-student-wallpaper.jpg');
            background-size: cover;
          }

          .cal-content {
            width: 400px;
            margin: 30px auto;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          }

          .cal-button {
            background-color: #007bff;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            font-weight: bold;
            border-radius: 5px;
            transition: background-color 0.3s;
            cursor: pointer;
            display: block;
            margin-top: 20px;
            border: none;
          }

          .cal-button:hover {
            background-color: #0056b3;
          }

          .sign-in-button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            display: block;
            margin: 20px auto; /* Center the button horizontally and add some vertical margin */
            border: none;
            transition: background-color 0.3s;
          }

          .sign-in-button:hover {
            background-color: #0056b3;
          }

          .date-picker-label {
            font-weight: bold;
            margin-top: 10px;
          }

          .date-picker {
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            font-size: 16px;
          }
        `}
      </style>
      <div className="cal-content">
      {session ? (
          <>
            <h2>Hey there {session.user.email}</h2>
            <label className="date-picker-label">Start of your event</label>
            <DatePicker
              className="date-picker"
              selected={start}
              onChange={(date) => setStart(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <label className="date-picker-label">End of your event</label>
            <DatePicker
              className="date-picker"
              selected={end}
              onChange={(date) => setEnd(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <p>Event name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} />
            <p>Event description</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
            <hr />
            <hr />
            <button className="cal-button" onClick={() => createCalendarEvent()}>
              Create Calendar Event
            </button>
            <p></p>
            <button className="cal-button" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <>
          <img src={img} className='img'></img>
            <button className="sign-in-button" onClick={() => googleSignIn()}>
              Sign In with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default Cal;


