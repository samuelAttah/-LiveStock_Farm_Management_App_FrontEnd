import { useState, useEffect } from "react";

const useGreeting = () => {
  const [greeting, setGreeting] = useState(String);

  const refreshTime = 3 * 1000;

  const fetchGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= "0" && hour < "12") {
      return setGreeting("Good Morning");
    } else if (hour >= "12" && hour < "16") {
      return setGreeting("Good Afternoon");
    } else if (hour >= "16" && hour < "24") {
      return setGreeting("Good Evening");
    }
  };

  useEffect(() => {
    const greetingInterval = setInterval(fetchGreeting, refreshTime);

    return () => clearInterval(greetingInterval);
  }, [refreshTime]);

  return { greeting };
};

export default useGreeting;
