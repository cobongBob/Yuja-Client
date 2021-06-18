import React, { useCallback } from 'react';
import "./Chat.scss"

const ChatRoom = ({ receiver, totalMsg, sender, setChatList, send, inputHandle,input}) => {

  const backToChatNode = useCallback(() => {
    setChatList(false)
  }, [])
  {console.log(123,receiver)}
  {console.log(123,sender)}
  return (
    <>
        <div className="whoBox">
            <div className="ChatWho">
              <img className="ChatWhoImg" src={`http://localhost:8888/files/profiles/${receiver.profilePic}`} alt="" />
            </div>
            <div className="chatWhoName">
              {receiver.name}
            </div>
        </div>

        <div id="ChatLogsWrapper">
          <div id="chatLog">
            {totalMsg?.map((data, index) =>  data.sender !== sender ?  (
                    <>

                  <div className="ChatReceiverBigWrapper">
                    <div className="ChatReceiverWrapper">
                      <div className="ReceiverImgWrapper">
                        <img className="ChatReceiverProfileImg" src="" alt="" />
                      </div>
                      <div className="ChatMessageReceiver">
                        {receiver.name}
                      </div>
                      <div className="ReceiverChatMessageContent">
                        <div>
                          <p className="ChatContent">{data.msg}</p>
                        </div>
                        <span className="ReceiverChatDate">{data.time}</span>
                      </div>
                    </div>
                  </div>
                    </>
                  ) : (
                    <>
                  <div className="ChatSenderBigWrapper">
                    <div className="ChatSenderWrapper">
                      <div className="SenderChatMessageContent">
                       <div>
                         <p className="ChatContent">{data.msg}</p>
                       </div>
                      <span className="SenderChatDate">{data.time}</span>
                      </div>
                    </div>
                  </div>
                    </>
                  )
            )}
          </div>
        </div>
      <div className="MessageInputWrapper">
        <div className="submitBox">
          <form>
            <button className="MessageButtonL"
                    type="button"
                    onClick={backToChatNode}
            >
              ◀
            </button>
            <input className="MessageInput"
                   type="text"
                   id="message"
                   name="msg"
                   placeholder="메세지를 적어주세요"
                   autoComplete="off"
                   value={input.msg}
                   maxLength="2000"
                   onChange={inputHandle}
            />
            <button className="MessageButtonR"
                    type="button"
                    onClick={()=>send(receiver)}
            >
              💬
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;