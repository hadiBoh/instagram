import { useEffect } from "react";

export default function ScrollChatToBottom() {


    const chat = document.querySelector(".chat-messages")

  useEffect(() => {
    chat?.scrollTo(1000,1000)
  }, []);

  return null;
}