import React, { useState, useEffect } from "react";
import { ContentLayout } from "../components/Layout/ContentLayout";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import {ClockProps} from "../features/clockSettings/types";
import AddClock from "../features/clockSettings/components/AddClock";
import ChangeClockSettings from "../features/clockSettings/components/ChangeClockSettings";
import Heading from "../components/Elements/Headings/Heading";
import SelectForm from "../components/Form/selectForm";
import { getAllClocks } from "../features/clockSettings/api/clockApi";
import storage from "../utils/storage";

export const Settings = () => {
  const [clocks, setClocks] = useState<ClockProps[]>([]);
  const initialClock = storage.getClock() // need to check what does this object contain 
  console.log ("Initial clock in settings " + initialClock)
   
   const [selectedClock, setSelectedClock] = useState<{ id: number; name: string }>({
    id: 0,
    name: "Select",
  });

  const changeClockOnStorage =(value : {id: number; name: string })=>{
    console.log(storage.getClock) // check this 
    setSelectedClock(value)
    storage.setClock(selectedClock)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await getAllClocks(storage.getUser().userId)
          //Convert from clockresponseprops, to clockprops
          const convertedClocks: ClockProps[] = response.map(clockResponse => ({
            id: clockResponse.id,
            name: clockResponse.name,
            timezone: {id :clockResponse.timeOffset, name : ""}
          }));
          console.log("response in setting " + response + "   converted clocks   " + convertedClocks)
          setClocks(convertedClocks)
      } catch (error) {
        console.error("Error fetching time zones:", error);
      }
    };
    fetchData();// DONE CHECK IF IT WORKS
  }, []);

  
 
  return (
    <>
      <ContentLayout className="relative">
        <ContentInnerContainer className={"w-full md:flex-1 mb-4 z-50 "}>
            <Heading text={"Switch to a different clock"} type={"heading1"}/>
            <Heading text={"To see a data of a different clock"} type={"heading4"}/>
          {clocks.length > 0 ? (
              <SelectForm
                  dropdownLabel="Select a clock"
                  options={clocks}
                  className="mb-5 z-50"
                  value={selectedClock}
                  onChange={changeClockOnStorage(selectedClock)}
              />
          ) : (
              <Heading text={"No clocks have been added yet"} type={"heading4"} />
          )}

        </ContentInnerContainer>
        <div className={"flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 z-1"}>
          <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <AddClock clocks={clocks} setClocks={setClocks} />
          </ContentInnerContainer>
          <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <ChangeClockSettings clocks={clocks} setClocks={setClocks} />
          </ContentInnerContainer>
        </div>
      </ContentLayout>
    </>
  );
};
