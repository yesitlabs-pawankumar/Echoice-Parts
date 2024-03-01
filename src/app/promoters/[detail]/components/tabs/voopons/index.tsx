"use client";
import CustomPagination from "@/components/CustomPagination";
import Card from "./Card";
import { useState } from "react";
interface Item {
  id: string;
}
const Voopons = ({ dataList = [] }) => {
  const [tempList, setTempList] = useState<any[]>(dataList);
  const [pageNo, setPageNo] = useState<number>(1);
  const handlePageChange = () => {
    let newEventList: any = [];
    for (let num = 8; num >= 0; num--) {
      let cal = pageNo * 9 - num;
      if (dataList.length > cal) {
        newEventList.push(dataList[cal]);
      }
    }
    setPageNo(pageNo);
    setTempList(newEventList);
  };
  return (
    <>
      <div
        className="tab-pane fade"
        id="voopons"
        role="tabpanel"
        aria-labelledby="voopons-tab"
      >
        <div className="row">
          {dataList.length > 0 &&
            dataList.map((item: Item) => <Card key={item?.id} data={item} />)}
        </div>
        <div className="row">
          {Array.isArray(dataList) && dataList.length === 0 && (
            <p className="noDataText">No Voopons</p>
          )}
        </div>
        <CustomPagination
          dataArray={tempList}
          pageNo={pageNo}
          clickPageNumber={handlePageChange}
          pageLimit={9}
        />
      </div>
    </>
  );
};

export default Voopons;
