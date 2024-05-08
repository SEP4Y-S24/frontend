import Heading from "../../../components/Elements/Headings/Heading";
import TextArea from "../../../components/Form/TextArea";
import SelectForm from "../../../components/Form/selectForm";
import { useState } from "react";
import { MessageProps } from "../types";
import PopUp from "../../../components/Elements/PopUp/PopUp";
import Button from "../../../components/Elements/Button";


const SendMessage = ({ receiverOptions, clockOptions }: any) => {

  const [message, setMessage] = useState<MessageProps>({
    text: "",
    receiver: { id: 0, name: "Select" },
    clock: { id: 0, name: "Select" },
  });

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

  // max 40 characters
  const validateMessageLength = (text: string): boolean => {
    return text.length <= 40;
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
      setMessageError("Message must be no more than 40 characters.");
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
      setShowPopup(true);

      setMessage({
        text: "",
        receiver: { id: 0, name: "Select" },
        clock: { id: 0, name: "Select" },
      });
    }

    console.log("Message:", message);
    console.log("Receiver:", message.receiver);
    console.log("Clock:", message.clock);
  };

  const handlePopupClose = () => {
    setShowPopup(false); 
  };

  return (
    <>
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
        onChange={(newValue) =>
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
        onChange={(newValue) =>
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
        onChange={(newValue) =>
          setMessage((prevMessage) => ({
            ...prevMessage,
            clock: newValue,
          }))
        }
        error={clockError}
      />
      <Button text="Click me" styleType={"info"} onClick={handleSendMessage} />

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
    </>
  );
};
export default SendMessage;