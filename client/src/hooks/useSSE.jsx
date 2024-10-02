import { useEffect, useRef } from "react";

const useSSE = (url, onMessage, onError, onOpen) => {
  const eventSourceRef = useRef(null);

  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    if (onMessage) {
      eventSource.onmessage = (event) => onMessage(event.data);
    }

    if (onError) {
      eventSource.onerror = (error) => onError(error);
    }

    if (onOpen) {
      eventSource.onopen = () => onOpen();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("Event source closed");
      }
    };
  }, [url]);
};

export default useSSE;
