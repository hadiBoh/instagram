import { useEffect, useRef, useState } from "react";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import { useAddMessageMutation, useGetConQuery } from "./messageApiSlice";
import { v4 as uuid } from "uuid";
import MemoizedRoom from "./Room";
import {useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown , faPaperPlane} from "@fortawesome/free-solid-svg-icons"

const Chat = () => {

  const auth = useAuth();
  const params = useParams();
  const { data: conversation } = useGetConQuery(auth?.username);
  const [addMessage] = useAddMessageMutation();
  const socket = useSocket();
  const [msg, setMsg] = useState("");
  const [comings, setComing] = useState(undefined);
  
  const isMounted = useRef(false);
  const isMounted2 = useRef(false);
  
  const firstScroll = useRef(document?.querySelector(".sign"))

  console.log(firstScroll)

  useEffect(() => {
    if (isMounted2.current === false) {
      isMounted2.current = true;
      socket.current.emit("join_room", { username: auth?.username });
      socket.current.on("get_users", (users) => {
        console.log(users);
      });
    }
  }, [auth?.username, socket]);

  const handleSend = async (e) => {
    e.preventDefault();
    if(!msg || msg.trim() === "") return
    const data = { msg, sender: auth?.username, convId: conversation[0]?._id };
    socket.current.emit("send_msg", {
      username: params?.user,
      msg,
      sender: auth?.username,
    });

    setComing({ ...data, _id: uuid() });
    await addMessage({
      msg,
      sender: auth?.username,
      convId: conversation[0]?._id,
    });
    setMsg("");
  }

  
  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
      socket.current.on("recieve_msg", (msg) => {
        setComing({
          msg: msg.msg,
          _id: uuid(),
          date: new Date(),
          sender: msg.sender,
        });
      });
    }
  }, [socket, auth?.username]);

  const scrollToBottom = ()=>{
    firstScroll?.current?.scrollIntoView({behavior:"smooth"})
  }

  return (
    <div className="chat">
      <section className="chat-box">
        <div  className="chat-messages">
        <span className="scroll_btn" onClick={scrollToBottom} ><FontAwesomeIcon icon={faAngleDown} /></span>
          <MemoizedRoom firstScroll={firstScroll} comings={comings} />
          <div ref={firstScroll} className="sign"> last </div>
        </div>
        <form className="chat-input" onSubmit={handleSend} >
          <input
            type="text"
            placeholder="type your message..."
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button onClick={handleSend}> <FontAwesomeIcon icon={faPaperPlane} /></button>
        </form>
      </section>
    </div>
  );
};

export default Chat;
