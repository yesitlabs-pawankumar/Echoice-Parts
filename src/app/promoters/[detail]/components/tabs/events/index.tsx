"use client";
import CustomPagination from "@/components/CustomPagination";
import Card from "./Card";
import { useEffect, useState } from "react";
import { calculateDistanceInMiles } from "@/relatedFunction/eventFunction";
interface Coordinates {
  latitude: number;
  longitude: number;
}
interface EventData {
  id: number;
  latitude: number;
  longitude: number;
  event_away_distance: number;
  // ... other properties of your event data
}

const Events = ({ dataList = [] }: { dataList: EventData[] }): any => {
  const [tempEventList, setTempEventList] = useState<any>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position = await new Promise<Coordinates>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error)
          );
        });

        if (dataList && position) {
          for (let indxEvent in dataList) {
            const targetLocation: Coordinates = {
              latitude: dataList[indxEvent]["latitude"],
              longitude: dataList[indxEvent]["longitude"],
            };
            dataList[indxEvent]["event_away_distance"] =
              calculateDistanceInMiles(position, targetLocation);
          }

          const tempEvtList = dataList;
          setTempEventList(tempEvtList);
        }
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    getCurrentLocation();
  }, [dataList]);

  const handlePageNumber = (pageNo: number) => {
    let newEventList: any = [];
    for (let num = 8; num >= 0; num--) {
      let cal = pageNo * 9 - num;
      if (tempEventList.length > cal) {
        newEventList.push(tempEventList[cal]);
      }
    }

    setPageNo(pageNo);
    setTempEventList(newEventList);
  };
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="events"
        role="tabpanel"
        aria-labelledby="events-tab"
      >
        <div className="row">
          {Array.isArray(dataList) &&
            dataList.length > 0 &&
            dataList?.map((item: any) => (
              <Card key={item?.id} cardData={item} />
            ))}
        </div>
        <div className="row">
          {Array.isArray(dataList) && dataList.length === 0 && (
            <p className="noDataText">No Events</p>
          )}
        </div>
        <CustomPagination
          dataArray={tempEventList}
          pageNo={pageNo}
          clickPageNumber={handlePageNumber}
          pageLimit={9}
        />
      </div>
    </>
  );
};

export default Events;
