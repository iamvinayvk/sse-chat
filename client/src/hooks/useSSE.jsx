import { useEffect, useRef } from "react";
import { useClientStore } from "../store/clientStore";

const useSSE = (url, onMessage, onError, onOpen) => {
  const eventSourceRef = useRef(null);
  const { clientId, setClientId, clearClientId } = useClientStore();

  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    if (onMessage) {
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (!clientId) {
          setClientId(data.clientId);
        }
        onMessage(data);
      };
    }

    if (onError) {
      eventSource.onerror = (error) => onError(error);
    }

    eventSource.onopen = (event) => {
      if (onOpen) {
        onOpen();
      }
    };

    eventSource.onclose = () => {
      clearClientId();
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        clearClientId();
      }
    };
  }, [url]);
};

export default useSSE;
