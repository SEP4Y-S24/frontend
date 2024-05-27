import Heading from "../../../components/Elements/Headings/Heading";
import TextArea from "../../../components/Form/TextArea";
import SelectForm from "../../../components/Form/selectForm";
import React, { useState } from "react";
import { MessageProps, SendMessageProps } from "../types";
import PopUp from "../../../components/Elements/PopUp/PopUp";
import Button from "../../../components/Elements/Button";
import { ContentInnerContainer } from "../../../components/Layout/ContentInnerContainer";
import { sendMessage } from "../api/messageApi";
import storage from "../../../utils/storage";
import SpinnerComponent from "../../spinner/SpinnerComponent";

interface MessageParams {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const SendMessage = ({setChange}: MessageParams) => {
  const [message, setMessage] = useState<MessageProps>({
    text: "",
    receiver: { id: 0, name: "Select" },
    clock: { id: 0, name: "Select" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
//TODO replace with api call later
  const receiverOptions = [
    { id: 1, name: "Receiver 1" },
    { id: 2, name: "Receiver 2" },
    { id: 3, name: "Receiver 3" },
  ];
//TODO replace with api call later
  const clockOptions = [
    { id: 1, name: "Clock 1" },
    { id: 2, name: "Clock 2" },
    { id: 3, name: "Clock 3" },
  ];

  const updateMessages = () => {
    setTimeout(() => {
      setChange(prevChange => !prevChange);
    }, 500); // 2000 milliseconds = 2 seconds
  };

  const [messageError, setMessageError] = useState("");
  const [receiverError, setReceiverError] = useState("");
  const [clockError, setClockError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopUp, setShowPopup] = useState(false);

  // for ASCII characters only
  const validateASCIIMessage = (text: string): boolean => {
    // eslint-disable-next-line no-control-regex
    const asciiRegex = /^[\x00-\x7F]*$/;
    return asciiRegex.test(text);
  };

  // max 96 characters
  const validateMessageLength = (text: string): boolean => {
    return text.length <=96;
  };

  const validateFields = () => {
    let valid = true;

    if (!message.text.trim()) {
      setMessageError("Please enter a message");
      valid = false;
    } else if (!validateASCIIMessage(message.text)) {
      setMessageError(
        "You may only use the characters A to Z, 0 to 9, and common symbols."
      );
      valid = false;
    } else if (!validateMessageLength(message.text)) {
      setMessageError("Message must be no more than 96 characters.");
      valid = false;
    } else {
      setMessageError("");
    }

    if (!message.receiver || message.receiver.id === 0) {
      setReceiverError("Please select a receiver");
      valid = false;
    } else {
      setReceiverError("");
    }

    if (!message.clock || message.clock.id === 0) {
      setClockError("Please select a clock");
      valid = false;
    } else {
      setClockError("");
    }

    return valid;
  };

  const handleSendMessage = () => {
    setSuccessMessage("");

    if (validateFields()) {

      setIsSubmitting(true);

      const messageToSend: SendMessageProps = {
        message: message.text,
        receiverId: "f8a383e2-38ee-4755-ac1f-c6aa881a5798",
        clockId: "bce5c68c-d26b-4fa5-826b-2d74912a7b80",
        userId: storage.getUser().userId? storage.getUser().UserId : "f8a383e2-38ee-4755-ac1f-c6aa881a5798",
      };
      sendMessage(messageToSend)
        .then(() => {
          updateMessages();
          setShowPopup(true);
          setMessage({
            text: "",
            receiver: { id: 0, name: "Select" },
            clock: { id: 0, name: "Select" },
          });
        })
        .catch((error:any) => {
          console.error("Error sending message:", error);
          // Handle error, such as displaying an error message to the user
        });
    }
    setIsSubmitting(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
        <Heading text={"Send a message"} type={"heading1"} />
        <Heading
          text={"Do not have specific contact? Add a new contact here!"}
          type={"heading4"}
          className={"pb-3"}
        />
        <TextArea
          rows={4}
          labelText="Your message"
          placeholder="Write your message here"
          className="mb-4"
          value={message.text}
          onChange={(newValue: string) =>
            setMessage((prevMessage) => ({
              ...prevMessage,
              text: newValue,
            }))
          }
          error={messageError}
        />
        <SelectForm
          dropdownLabel="Select receiver"
          options={receiverOptions}
          className="mb-4"
          value={message.receiver}
          onChange={(newValue: any) =>
            setMessage((prevMessage) => ({
              ...prevMessage,
              receiver: newValue,
            }))
          }
          error={receiverError}
        />
        <SelectForm
          dropdownLabel="Select clocks of receiver"
          options={clockOptions}
          className="mb-5"
          value={message.clock}
          onChange={(newValue: any) =>
            setMessage((prevMessage) => ({
              ...prevMessage,
              clock: newValue,
            }))
          }
          error={clockError}
        />
        <div className={"pt-5"}>
          {isSubmitting ? (
              <SpinnerComponent />
          ) : (
              <Button
                  text="Click me"
                  styleType={"info"}
                  onClick={handleSendMessage}
              />
          )}
        </div>


        {successMessage && <p className="text-green mt-3">{successMessage}</p>}

        {showPopUp && (
          <PopUp
            title="Success"
            textAlert="Message was sent succesfully!"
            type="success"
            buttonCancelText={"Close"}
            onCancel={handlePopupClose}
          />
        )}
      </ContentInnerContainer>
    </>
  );
};
export default SendMessage;
