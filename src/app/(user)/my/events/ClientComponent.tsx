"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import {
  filterEvent,
  calculateDistanceInMiles,
  isDate1BeforeDate2,
  countCategory,
  filterByEventDistance,
  filterObjectsByDateRange,
  convertTo12HourFormat,
  filterObjectsByDateRangeMyEvents,
} from "@/relatedFunction/eventFunction";
import { DateTime } from "luxon";
import { BASE_URL } from "@/constant/constant";
import CustomPagination from "@/components/CustomPagination";
import Slider from "@/components/Slider";
import AutoCompleteGoogle from "@/components/AutoCompleteGoogle";
import CustomDatePicker from "@/components/CustomDatePicker";
import {
  checkExpirationStatus,
  filterByVoopanDistance,
  filterVoopansByDateRange,
} from "@/relatedFunction/voopanFunction";
import {
  Coordinates,
  FilterApplyType,
  SelectCategoryType,
} from "@/app/voopons/ClientComponent";
import { toast } from "react-toastify";
import { postFetchDataWithAuth } from "@/fetchData/fetchApi";
import { useAuth } from "@/app/UserProvider";

const ClientComponent = ({
  categoryMainList = [],
}: {
  categoryMainList: any[];
}) => {
  const { isAuthenticated, userDetails } = useAuth();
  const [location, setLocation] = useState(false);
  const [eventList, setEventList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [tempEventList, setTempEventList] = useState<any>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [selectCategory, setSelectCategory] = useState<SelectCategoryType>({
    category_id: "All",
  });
  const [appliedFilter, setAppliedFilter] = useState<FilterApplyType>({
    isCategoryApply: false,
    isSearchApply: false,
    isDateRangeApply: false,
    isLoacationApply: false,
    isMilesAppy: false,
    isPaginationApply: false,
  });
  const [renderList, setRenderList] = useState<any>([]);
  const [dateFilter, setDateFilter] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [silderValue, setSliderValue] = useState({ from: 0, to: 100 });

  const targetDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetchEventList();
  }, [categoryMainList]);

  const fetchEventList = async () => {
    try {
      const resultEvent = await postFetchDataWithAuth({
        data: { user_id: userDetails.user_id },
        endpoint: "user_my_event_list",
        authToken: userDetails.token,
      });
      if (Array.isArray(resultEvent?.data)) {
        const templist = resultEvent.data.map((item) => ({
          ...item,
          category_id: item?.promoter_event?.category_id,
          subcategory_id: item?.promoter_event?.subcategory_id,
        }));

        setEventList(filterEvent(templist, categoryMainList));
        setCategoryList(countCategory(categoryMainList, templist));
      } else {
        setEventList([]);
        throw resultEvent;
      }
    } catch (error: any) {
      const errorMessage =
        typeof error === "string"
          ? `${error}`
          : error?.message
          ? error?.message
          : `${error}`;
      toast.error(errorMessage);
    }
  };

  const handleSelectLocation = (e) => {
    setLocationFilter(e);
  };
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position = await new Promise<Coordinates>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error)
          );
        });

        if (categoryList && eventList && position) {
          for (let indxEvent in eventList) {
            const targetLocation: Coordinates = {
              latitude: eventList[indxEvent]["promoter_event"]["latitude"],
              longitude: eventList[indxEvent]["promoter_event"]["longitude"],
            };
            eventList[indxEvent]["event_away_distance"] =
              calculateDistanceInMiles(position, targetLocation);
          }
          const tempEvtList = filterEvent(eventList, categoryList);
          setTempEventList(tempEvtList);
          if (tempEvtList.length > 9) {
            setAppliedFilter(
              (pre): FilterApplyType => ({ ...pre, isPaginationApply: true })
            );
          } else {
            setRenderList(tempEvtList);
          }
        }
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    getCurrentLocation();
  }, [categoryList, eventList]);
  useEffect(() => {
    let tempList: any = filterEvent(eventList, categoryList);

    if (appliedFilter.isCategoryApply) {
      tempList = filterEvent(tempList, [
        { category_id: Number(selectCategory.category_id) },
      ]);
    } else if (!appliedFilter.isCategoryApply) {
      tempList = filterEvent(tempList, categoryList);
    }
    if (appliedFilter.isSearchApply) {
      let newEvent = tempList.filter((evt): any =>
        evt?.promoter_event?.events_name
          .toLowerCase()
          ?.includes(searchValue.toLowerCase())
      );
      setTempEventList(newEvent);
      tempList = newEvent;
    } else if (!appliedFilter.isSearchApply) {
      tempList = filterEvent(tempList, categoryList);
    }
    if (appliedFilter.isDateRangeApply) {
      const date = new DateObject(dateFilter[0]);
      const date1 = new DateObject(dateFilter[1]);
      if (isDate1BeforeDate2(date.format(), date1.format())) {
        tempList = filterObjectsByDateRangeMyEvents(
          date.format(),
          date1.format(),
          tempList,
          "promoter_event"
        );
        setTempEventList(tempList);
      }
    } else if (!appliedFilter.isDateRangeApply) {
      tempList = filterEvent(tempList, categoryList);
    }
    if (locationFilter.length > 0) {
      let newEvent = tempList.filter((obj) => {
        const locationParts = obj?.promoter_event?.location?.split(", ") || [];

        return locationParts.some((part) =>
          locationFilter.some((name) => part.includes(name))
        );
      });

      setTempEventList(newEvent);
      tempList = newEvent;
    } else if (locationFilter.length === 0) {
      tempList = tempList;
    }
    if (appliedFilter.isMilesAppy) {
      tempList = filterByEventDistance(
        tempList,
        silderValue.from,
        silderValue.to
      );
      setTempEventList(tempList);
    } else if (!appliedFilter.isMilesAppy) {
      tempList = filterEvent(tempList, categoryList);
    }
    if (tempList.length > 9 && appliedFilter.isPaginationApply) {
      setTempEventList(tempList);
      tempList = tempList.filter((item, indx) => indx < 9);
    } else {
      tempList = tempList;
    }
    setPageNo(1);
    setRenderList(tempList);
    // eslint-disable-next-line
  }, [appliedFilter, locationFilter]);

  const handleCategorySelect = (category) => {
    const isCategoryEqual =
      category.category_id.toString() === selectCategory.category_id;
    if (!isCategoryEqual) {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isCategoryApply: true })
      );
      setSelectCategory({
        category_id: category.category_id.toString(),
      });
    } else if (isCategoryEqual) {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isCategoryApply: false })
      );
      setSelectCategory({
        category_id: "All",
      });
      if (targetDivRef.current) {
        targetDivRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  const handleDateFilter = (e) => {
    const date = new DateObject(e[0]);
    const date1 = new DateObject(e[1]);
    setDateFilter(e);

    if (isDate1BeforeDate2(date.format(), date1.format())) {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isDateRangeApply: true })
      );
    } else {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isDateRangeApply: false })
      );
    }
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handlePageNumber = (pageNo: number) => {
    let newEventList: any = [];
    for (let num = 8; num >= 0; num--) {
      let cal = pageNo * 9 - num;
      if (tempEventList.length > cal) {
        newEventList.push(tempEventList[cal]);
      }
    }
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setPageNo(pageNo);
    setRenderList(newEventList);
  };
  const handleSearchValue = (e) => {
    if (e.target.value) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue(e.target.value);
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isSearchApply: false })
      );
    }
  };
  const handleEventSearch = (e) => {
    e.preventDefault();

    if (searchValue) {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isSearchApply: true })
      );
    } else {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isSearchApply: false })
      );
    }
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleSlider = (e) => {
    setSliderValue({ from: e.fromValue, to: e.toValue });
    if (e.fromValue === 0 && e.toValue === 100) {
      setAppliedFilter(
        (pre): FilterApplyType => ({
          ...pre,
          isMilesAppy: false,
        })
      );
    } else {
      setAppliedFilter(
        (pre): FilterApplyType => ({
          ...pre,
          isMilesAppy: true,
        })
      );
    }
  };

  return (
    <div className="user-dashboard-data user-my-eve">
      <div className="user-my-favorites">
        <div className="deals-inner-search">
          <form onSubmit={handleEventSearch}>
            <label className="interests-search">
              <input
                type="text"
                placeholder="Search for Events"
                value={searchValue}
                onChange={handleSearchValue}
              />
              <button type="submit">
                <Image width={20} height={21} src="/images/search.png" alt="" />
              </button>
            </label>
          </form>
        </div>
      </div>
      <div className="user-my-voop-eve">
        <div className="row">
          <div className="col-lg-12 mb-3">
            <div className="show-cal-loc-range">
              <div className="dropdown date-range">
                <a
                  className="btn select-categories text-left"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  Event Categories{" "}
                </a>
                <ul
                  className="dropdown-menu w-100"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {categoryList.map((item: any) => (
                    <li key={item.category_id}>
                      <a
                        style={{
                          cursor: "pointer",
                          color:
                            selectCategory.category_id === `${item.category_id}`
                              ? "#F10027"
                              : "black",
                        }}
                        onClick={() => handleCategorySelect(item)}
                        id={item.category_id}
                      >
                        {item.category_name} <span>({item.count})</span>{" "}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="calendar">
                <div className="broker-date">
                  <CustomDatePicker
                    date={dateFilter}
                    onChange={handleDateFilter}
                  />
                </div>
              </div>
              <div className="location-drop">
                <a
                  onClick={() => setLocation(location ? false : true)}
                  className="btn btn-location text-left"
                  href="#"
                  role="button"
                >
                  {" "}
                  Location{" "}
                </a>
                <div
                  className="location-drop-list"
                  style={{ display: location ? "block" : "none" }}
                >
                  <form>
                    <AutoCompleteGoogle
                      select={locationFilter}
                      setSelect={handleSelectLocation}
                    />
                  </form>
                </div>
              </div>
              <div className="dropdown mile-rad-range date-range">
                <a
                  className="btn btn-date-range text-left"
                  type="button"
                  id="date-range-drop"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select your Mile Radius{" "}
                </a>
                <Slider
                  initialValueFrom={0}
                  initialValueTo={100}
                  handleSliderValues={handleSlider}
                />
              </div>
            </div>
          </div>

          {Array.isArray(renderList) &&
            renderList.length > 0 &&
            renderList.map((item, index) => {
              return (
                <div key={index} className="col-lg-4">
                  <div className="event-brand-box w-100">
                    <div className="brand-logo">
                      <span>
                        {" "}
                        $
                        {Number(item?.promoter_event?.events_price) === 0
                          ? "Free"
                          : Number(item?.promoter_event?.events_price)}{" "}
                      </span>
                      <Image
                        width={290}
                        height={226}
                        alt=""
                        style={{ objectFit: "cover" }}
                        src={
                          item?.eventimageone?.image_name
                            ? `${BASE_URL}/${item?.eventimageone?.image_name}`
                            : "/images/near-event1.png"
                        }
                      />
                    </div>
                    <div className="event-pad">
                      <h6> {item?.promoter_event?.events_name}</h6>
                      <p className="truncate-text">
                        {item?.promoter_event?.events_description}
                      </p>
                      <div className="point-icon">
                        <span>
                          <Image
                            width={20}
                            height={20}
                            src="/images/location-dot.png"
                            alt=""
                          />{" "}
                          {item.event_away_distance} miles away
                        </span>
                        <span>
                          <Image
                            width={20}
                            height={20}
                            src="/images/calendar.png"
                            alt=""
                          />{" "}
                          {DateTime.fromFormat(
                            item?.promoter_event?.events_date,
                            "yyyy-MM-dd"
                          ).toFormat("MMMM dd, yyyy")}{" "}
                        </span>
                        <span>
                          <Image
                            width={20}
                            height={20}
                            src="/images/watch.png"
                            alt=""
                          />{" "}
                          {convertTo12HourFormat(
                            item?.promoter_event?.events_start_time
                          )}{" "}
                          to{" "}
                          {convertTo12HourFormat(
                            item?.promoter_event?.events_end_time
                          )}{" "}
                        </span>
                      </div>
                      <a
                        className="btn btn-viewmore-border"
                        role="button"
                        href={`/my/events/${item?.promoter_event_id}?promoter_id=${item?.promoter_event?.promoter_id}`}
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          {Array.isArray(renderList) && renderList.length === 0 && (
            <div className="row">
              <p className="noDataText">No Events </p>
            </div>
          )}
          <CustomPagination
            dataArray={tempEventList}
            pageNo={pageNo}
            clickPageNumber={handlePageNumber}
            pageLimit={9}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientComponent;
