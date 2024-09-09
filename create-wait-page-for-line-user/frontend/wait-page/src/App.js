import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
// import { useNavigate, Route } from 'react-router-dom';

// const WaitPage = () => {
//   // const history = useNavigate();
//   const [countdown, setCountdown] = useState(3); // 3 minutes in seconds

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCountdown((prevCount) => {
//         if (prevCount <= 1) {
//           console.log('Redirecting to event page...');
//           clearInterval(intervalId); // Stop the countdown
//           // history.push('/event'); // Redirect to the event page
//         }
//         return prevCount - 1;
//       });
//     }, 1000); // Update every second

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, [
//     // history
//   ]);

//   // const minutes = Math.floor(countdown / 60);
//   // const seconds = countdown % 60;
//   const minutes = 0;
//   const seconds = countdown
//   return (
//     <div>
//       <h1>Please Wait</h1>
//       <p>We're currently experiencing heavy traffic. You will be redirected to the event shortly.</p>
//       <p>{`You will be redirected in ${minutes}:${seconds.toString().padStart(2, '0')}`}</p>
//     </div>
//   );
// };

// const WaitPageWithLocalStorage = () => {
//   const [countDown, setCountDown] = useState(
//     parseInt(localStorage.getItem("countdownStart")) || 0
//   );

//   useEffect(() => {
//     // Check if there was a countdown started previously
//     let timer;
//     if (countDown > 0) {
//       timer = setInterval(() => {
//         setCountDown((prevCount) => {
//           const nextCount = prevCount - 1;
//           // Save the updated countdown in local storage
//           localStorage.setItem("countdownStart", nextCount.toString());
//           return nextCount;
//         });
//       }, 1000);
//     }

//     return () => clearInterval(timer); // Cleanup the interval on component unmount
//   }, [countDown]);

//   useEffect(() => {
//     // Reset countdown in local storage when it reaches 0
//     if (countDown === 0) {
//       localStorage.removeItem("countdownStart");
//     }
//   }, [countDown]);

//   return (
//     <div>
//       <h1>Wait for {countDown} seconds</h1>
//       {countDown === 0 && <p>Countdown finished</p>}
//     </div>
//   );
// };
const EventPage = () => {
  const [message, setMessage] = useState('Loading...');
  const [token, setToken] = useState('');
  const [countDown, setCountDown] = useState(180); // 3 minutes in seconds
  const callEventApi = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Clearing the retry timestamp from local storage upon success
        localStorage.removeItem('eventRetryTimestamp');
        setMessage('Welcome to the Event!');
      } else if (response.status === 503) {
        // Server is busy, wait for 3 minutes before retrying
        const retryTime = Date.now() + 180000; // Current time plus 3 minutes
        localStorage.setItem('eventRetryTimestamp', retryTime);
        setMessage('Event is full, waiting for 3 minutes to retry...');

        const retryTimeout = setTimeout(() => {
          callEventApi();
        }, 180000); // Retry after 3 minutes

        // Cleanup the timeout if the component unmounts
        return () => clearTimeout(retryTimeout);
      } else {
        // Handle other types of server responses
        setMessage('Error: Something went wrong, please try again later.');
      }
    } catch (error) {
      setMessage('Error: Network error, please try again later.');
    }
  };

  useEffect(() => {
    const retryTimestamp = localStorage.getItem('eventRetryTimestamp');
    const currentTime = Date.now();
        let timer;
    if (countDown > 0) {
      timer = setInterval(() => {
        setCountDown((prevCount) => {
          const nextCount = prevCount - 1;
          // Save the updated countdown in local storage
          localStorage.setItem("countdownStart", nextCount.toString());
          return nextCount;
        });
      }, 1000);
    }
    // If there's a retry timestamp and it's in the future
    if (retryTimestamp && parseInt(retryTimestamp, 10) > currentTime) {
      const delay = parseInt(retryTimestamp, 10) - currentTime;

      setMessage(`Event is full, retrying in ${Math.ceil(delay / 60000)} minutes...`);

      const retryTimeout = setTimeout(() => {
        callEventApi();
      }, delay);

      // Cleanup the timeout if the component unmounts
      return () => clearTimeout(retryTimeout);
    } else {
      // If no retry timestamp or it's past, call the API
      callEventApi();
    }
  }, []);

  return (
    <div>
      <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
      <button onClick={callEventApi}>Call Event API</button>
      <h1>Event Page</h1>
      <p>{message}</p>
    </div>
  )
};

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return (
    <div className="App">
      <header className="App-header">

        {/* <WaitPage /> */}
        {/* <WaitPageWithLocalStorage /> */}
        <EventPage />
      </header>
    </div>
  );
}

export default App;
