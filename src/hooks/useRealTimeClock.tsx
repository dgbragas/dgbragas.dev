import * as React from 'react';

const useRealTimeClock = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('pt-BR', { hour12: false });

  return formatTime(time);
};

export { useRealTimeClock };
