import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/Elements/Button";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import SelectForm from "../../../components/Form/selectForm";
import { useState } from "react";
import { utcTimezones } from "../data/timezones";
import { ClockProps, TimeProps } from "../types";
import PopUp from "../../../components/Elements/PopUp/PopUp";

const AddClock = ({ clocks, setClocks }: { clocks: ClockProps[]; setClocks: React.Dispatch<React.SetStateAction<ClockProps[]>> }) => {
  const [clockName, setClockName] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState({
    id: -13,
    name: "Select",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedClock, setSelectedClock] = useState<ClockProps>({
    id: 0,
    name: "Select",
    timezone: { id: -13, name: "Select" },
  });

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000); // Temporary
  };

  function handleOnChangeTimezone(value: TimeProps) {
    setSelectedTimezone(value);
    console.log("Time:", value);
  }

  const handleAddClock = () => {
    const newClock: ClockProps = {
      id: generateRandomId(),
      name: clockName !== "" ? clockName : "Unnamed Clock",
      timezone: selectedTimezone, // Use the selected timezone value
    };

    setClocks([...clocks, newClock]); // Add the new clock to the clocks array
    setClockName(""); // Reset the clock name field
    setSelectedTimezone({ id: -13, name: "Select" }); // Reset the selected timezone

    console.log("Clock added:", newClock);
  };

  const handleDeleteClock = (id: number) => {
    setShowPopup(true);
    const clockToDelete = clocks.find((clock) => clock.id === id);
    if (clockToDelete) {
      setSelectedClock(clockToDelete);
    }
  };

  // Function to handle the deletion process
  const handleConfirmDelete = () => {
    const updatedClocks = [...clocks];
    updatedClocks.splice(
      updatedClocks.findIndex((clock) => clock.id === selectedClock.id),
      1
    );
    setClocks(updatedClocks);
    setShowPopup(false);

    setSelectedClock({
      id: 0,
      name: "Select",
      timezone: { id: -13, name: "Select" },
    }); // Reset selected clock
  };

  return (
    <>
      <Heading text={"Add a new clock"} type={"heading1"} />
      <Heading
        text={"Add a new clock and set it up!"}
        type={"heading4"}
        className={"pb-3"}
      />
      <InputField
        labelText="Name of the clock"
        placeholder="e.g. Alexa"
        className={"pb-3"}
        value={clockName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setClockName(e.target.value)
        }
      />
      <SelectForm
        dropdownLabel="Select timezone"
        options={utcTimezones}
        className="pb-3"
        value={selectedTimezone}
        onChange={handleOnChangeTimezone}
      />
      <Button
        text="Generate clock id"
        styleType="info"
        className="mt-3 mb-2"
        onClick={handleAddClock}
      />
      <Heading text={"Your clocks"} type={"heading2"} className={"pt-3 pb-4"} />
      {clocks.map((clock) => (
        <div
          key={clock.id}
          className="mb-5 flex items-center space-x-3 p-3 hover:bg-whiteHover rounded-md shadow-md "
        >
          <div className="flex-grow">
            <Heading
              key={clock.name}
              text={clock.name.toUpperCase()}
              type={"heading3"}
            />
            <Heading
              key={clock.id}
              text={clock.id.toString()}
              type={"heading4"}
            />
            <Heading
              key={clock.timezone.id}
              text={clock.timezone.name}
              type={"heading4"}
            />
          </div>
          <div>
            <button onClick={() => handleDeleteClock(clock.id)}>
              <XMarkIcon className="size-6 text-secondaryText" />
            </button>
          </div>
          {showPopup && (
            <PopUp
              title="Delete Clock"
              textAlert={`Are you sure you want to delete the clock "${selectedClock.name}"?`}
              type="danger"
              buttonCancelText="Cancel"
              buttonProceedText={"Delete"}
              onClickProceed={handleConfirmDelete}
              onCancel={() => setShowPopup(false)} // Handle cancel action
            />
          )}
        </div>
      ))}
    </>
  );
};
export default AddClock;