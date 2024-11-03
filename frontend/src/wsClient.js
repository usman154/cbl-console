import { useEffect, useState } from 'react';
import { useToken } from './TokenContext';

const useWebSocket = (addLogEntry) => {
  const [jobStatuses, setJobStatuses] = useState({});
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      console.error('Token not found');
      return;
    }
    const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;
    const ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
      ws.send(token);
    };

    ws.onmessage = (message) => {
      if (message.data === 'token:invalid') {
        alert('Invalid Token');
        location.reload();
        return;
      }

      const { jobType, status , type, message: logMessage } = JSON.parse(message.data);
      const isLog = type === 'log';
      // Update jobStatuses with a new object to ensure re-render
      setJobStatuses((prevStatuses) => ({
        ...prevStatuses,
        [jobType]: {
          status: status || prevStatuses[jobType]?.status || 'pending',
          logs: isLog ? [...(prevStatuses[jobType]?.logs || []), logMessage] : (prevStatuses[jobType]?.logs || []),
        },  // Updated status structure for simplicity
      }));
      if (isLog) {
        addLogEntry(jobType, logMessage);
      }
    };

    return () => ws.close();
  }, [token]); // Dependency on token ensures ws reconnects if token changes

  return jobStatuses;
};

export default useWebSocket;
