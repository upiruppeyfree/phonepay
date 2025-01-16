import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(180); // 180 seconds (3 minutes)

  useEffect(() => {
    if (count <= 0) return; // Stop counting at 0

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [count]);

  // Convert seconds to MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.counter}>{formatTime(count)}</h1>
      <p style={styles.text}>3-Minute Countdown</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#5F259E",
    color: "white",
  },
  counter: {
    fontSize: "5rem",
    margin: "0",
  },
  text: {
    marginTop: "1rem",
    fontSize: "1.2rem",
  },
};

export default Counter;
