"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../UserProvider";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { postFetchDataWithAuth } from "@/fetchData/fetchApi";
import { toast } from "react-toastify";
import AutoCompleteGoogle from "@/components/AutoCompleteGoogle";
import Image from "next/image";
import { BASE_URL } from "@/constant/constant";
import { Rating } from "@mui/material";
import Link from "next/link";
import CustomPagination from "@/components/CustomPagination";
interface ClientComponentProps {
  categoryList: any;
  promoterList: any;
}
interface Coordinates {
  latitude: number;
  longitude: number;
}
interface FilterApplyType {
  isCategoryApply: boolean;
  isSearchApply: boolean;
  isDateRangeApply: boolean;
  isLoacationApply: boolean;
  isMilesAppy: boolean;
  isPaginationApply: boolean;
  isFollwerAdd: boolean;
}
interface SelectCategoryType {
  category_id: string;
}

const ClientComponent: React.FC<ClientComponentProps> = ({
  categoryList,
  promoterList,
}) => {
  const [location, setLocation] = useState(false);
  const [tempPromoterList, setTempPromoterList] = useState<any>([]);
  const [mainList, setMainList] = useState<any>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [selectCategory, setSelectCategory] = useState<SelectCategoryType>({
    category_id: "All",
  });
  const [reload, setReload] = useState<boolean>(false);
  const [appliedFilter, setAppliedFilter] = useState<FilterApplyType>({
    isCategoryApply: false,
    isSearchApply: false,
    isDateRangeApply: false,
    isLoacationApply: false,
    isMilesAppy: false,
    isPaginationApply: false,
    isFollwerAdd: false,
  });
  const [renderList, setRenderList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const { isAuthenticated, userDetails } = useAuth();
  let pathName = usePathname();

  const router = useRouter();
  useEffect(() => {
    if (promoterList?.length > 12) {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isPaginationApply: true })
      );
    } else {
      setMainList(promoterList);
      setRenderList(promoterList);
    }
  }, [categoryList, promoterList]);

  useEffect(() => {
    if (isAuthenticated) {
      fechData();
    } else {
      setMainList(promoterList);
    }
    async function fechData() {
      try {
        const formdata = {
          user_id: userDetails.user_id,
        };
        const response = await postFetchDataWithAuth({
          data: formdata,
          endpoint: "user_promoter_follow_list",
          authToken: userDetails.token,
        });

        if (response.success) {
          const newList = promoterList.map((promoter) => {
            const findMatchPromoter = response.data.find(
              (promoterId) => promoterId.promoter_id === promoter.id
            );
            if (findMatchPromoter?.user_id) {
              return { ...promoter, ...findMatchPromoter };
            } else {
              return { ...promoter, follow_status: "0" };
            }
          });
          setMainList(newList);
          setAppliedFilter(
            (pre): FilterApplyType => ({
              ...pre,
              isFollwerAdd: !pre.isFollwerAdd,
            })
          );
        } else {
          throw response;
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    }
    // eslint-disable-next-line
  }, [isAuthenticated, reload]);
  useEffect(() => {
    let tempList: any = mainList;

    if (appliedFilter.isCategoryApply) {
      let newPrmoter = tempList.filter((listItem: any) =>
        listItem.category_id_list.includes(selectCategory.category_id)
      );

      setTempPromoterList(newPrmoter);
      tempList = newPrmoter;
    } else if (!appliedFilter.isCategoryApply) {
      tempList = tempList;
    }
    if (appliedFilter.isSearchApply) {
      let newPrmoter = tempList.filter((evt): any =>
        evt?.name.toLowerCase()?.includes(searchValue.toLowerCase())
      );
      setTempPromoterList(newPrmoter);
      tempList = newPrmoter;
    } else if (!appliedFilter.isSearchApply) {
      tempList = tempList;
    }
    // if (appliedFilter.isDateRangeApply) {
    //   const date = new DateObject(dateFilter[0]);
    //   const date1 = new DateObject(dateFilter[1]);
    //   if (isDate1BeforeDate2(date.format(), date1.format())) {
    //     tempList = filterObjectsByDateRange(
    //       date.format(),
    //       date1.format(),
    //       tempList
    //     );
    //   }
    // } else if (!appliedFilter.isDateRangeApply) {
    //   tempList = filterEvent(tempList, categoryList);
    // }
    if (locationFilter.length > 0) {
      let newEvent = tempList.filter((obj) => {
        const locationParts = obj?.location?.split(", ") || [];

        return locationParts.some((part) =>
          locationFilter.some((name) => part.includes(name))
        );
      });

      setTempPromoterList(newEvent);
      tempList = newEvent;
    } else if (locationFilter.length === 0) {
      tempList = tempList;
    }
    // if (appliedFilter.isMilesAppy) {
    //   tempList = filterByEventDistance(
    //     tempList,
    //     silderValue.from,
    //     silderValue.to
    //   );
    // } else if (!appliedFilter.isMilesAppy) {
    //   tempList = filterEvent(tempList, categoryList);
    // }
    if (tempList?.length > 12 && appliedFilter.isPaginationApply) {
      setTempPromoterList(tempList);
      tempList = tempList.filter((item, indx) => indx < 12);
    } else {
      tempList = tempList;
    }
    setPageNo(1);
    setRenderList(tempList);
    // eslint-disable-next-line
  }, [appliedFilter, locationFilter]);

  const handlePageNumber = (pageNo: number) => {
    let newPrmoterList: any = [];
    for (let num = 11; num >= 0; num--) {
      let cal = pageNo * 12 - num;
      if (tempPromoterList.length > cal) {
        newPrmoterList.push(tempPromoterList[cal]);
      }
    }
    // if (targetDivRef.current) {
    //   targetDivRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
    setPageNo(pageNo);
    setRenderList(newPrmoterList);
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
  const handlePromoterSearch = (e) => {
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
    // if (targetDivRef.current) {
    //   targetDivRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
  };
  const handleFollow = async (id) => {
    if (!isAuthenticated) {
      router.push(`/login?lastPath=${pathName}`);
    } else if (isAuthenticated) {
      try {
        const formdata = {
          promoter_id: id,
          follow_status: 1,
          user_id: userDetails.user_id,
        };
        const response = await postFetchDataWithAuth({
          data: formdata,
          endpoint: "user_follower_promoter",
          authToken: userDetails.token,
        });

        if (response.success) {
          setReload(!reload);
          toast.success(`You have successfully follow promoter`);
        } else {
          throw response;
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    }
  };
  const handleUnFollow = async (id) => {
    if (!isAuthenticated) {
      router.push(`/login?lastPath=${pathName}`);
    } else if (isAuthenticated) {
      try {
        const formdata = {
          promoter_id: id,
          follow_status: 0,
          user_id: userDetails.user_id,
        };
        const response = await postFetchDataWithAuth({
          data: formdata,
          endpoint: "user_follower_promoter",
          authToken: userDetails.token,
        });

        if (response.success) {
          setReload(!reload);
          toast.success(`You have successfully unfollow promoter`);
        } else {
          throw response;
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    }
  };
  const handleCategorySelect = (category) => {
    const isCategoryEqual = category.category_id === selectCategory.category_id;
    if (!isCategoryEqual) {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isCategoryApply: true })
      );
      setSelectCategory({
        category_id: category.category_id,
      });
    } else if (isCategoryEqual) {
      setAppliedFilter(
        (pre): FilterApplyType => ({ ...pre, isCategoryApply: false })
      );
      setSelectCategory({
        category_id: "All",
      });
    }
  };
  const handleSelectLocation = (e) => {
    setLocationFilter(e);
  };
  return (
    <div className="container">
      <div className="row justify-content-center p-3">
        <div className="col-lg-6">
          <form
            className="d-flex new-srchbox mb-3"
            onSubmit={handlePromoterSearch}
          >
            <input
              className="new-srch"
              type="search"
              placeholder="Search for Promoter"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearchValue}
            />
            <button className="srch-btn srch-btn-page" type="submit">
              <Image width={15} height={16} src="/images/search.png" alt="" />
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 mb-3">
          <div className="show-cal-loc-range show-in-right promoter-filter">
            <div className="location-drop">
              <a
                onClick={() => setLocation(location ? false : true)}
                className="btn btn-location text-left"
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

            <div className="dropdown date-range">
              <a
                className="btn select-categories text-left"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {" "}
                Categories{" "}
              </a>
              <ul
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                {categoryList.map((catItem): any => (
                  <li key={catItem.category_id}>
                    <a
                      className={`dropdown-item ${
                        selectCategory.category_id === catItem.category_id &&
                        "dropdown-select"
                      }`}
                      href="#"
                      style={{
                        color:
                          selectCategory.category_id === catItem.category_id
                            ? "#F10027"
                            : "black",
                      }}
                      onClick={() => handleCategorySelect(catItem)}
                    >
                      {catItem.category_name}{" "}
                      <span>({catItem?.promoter_id_list?.length})</span>
                    </a>
                  </li>
                ))}
                {/* <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(50)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(20)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(10)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(20)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(10)</span>
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="dropdown sort-drop">
              <a
                className="btn sort text-left"
                type="button"
                id="sort-drop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort{" "}
              </a>
              <ul className="dropdown-menu w-100" aria-labelledby="sort-drop">
                <li>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Top Rating{" "}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Near By{" "}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Upcoming Events{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown ratings-drop">
              <a
                className="btn ratings text-left"
                type="button"
                id="rating-drop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {" "}
                Ratings{" "}
              </a>
              <ul className="dropdown-menu w-100" aria-labelledby="rating-drop">
                <li>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Low to High
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {" "}
                    High to Low
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {Array.isArray(renderList) &&
          renderList.length > 0 &&
          renderList.map((item: any, index: number) => {
            return (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="promoter-profile">
                  <div className="profile-img">
                    <div className="pro-img">
                      {" "}
                      <Image
                        width={254}
                        height={254}
                        src={
                          item?.profile_image
                            ? `${BASE_URL}/${item?.profile_image}`
                            : "/images/promoter/promoter-1.png"
                        }
                        alt=""
                      />
                    </div>
                    {(!item.hasOwnProperty("follow_status") ||
                      item?.follow_status === "0") && (
                      <div
                        className="pro-flow"
                        onClick={() => handleFollow(item?.id)}
                      >
                        {" "}
                        <Image
                          width={38}
                          height={38}
                          src="/images/promoter/flow-plus.png"
                          alt=""
                        />
                      </div>
                    )}
                    {item.hasOwnProperty("follow_status") &&
                      item?.follow_status === "1" && (
                        <div
                          className="pro-flow"
                          onClick={() => handleUnFollow(item?.id)}
                        >
                          {" "}
                          <Image
                            width={38}
                            height={38}
                            src="/images/promoter/flow-check.png"
                            alt=""
                          />
                        </div>
                      )}
                  </div>
                  <div className="Pro-text">
                    <h4 className="title-capitilize">{item.name}</h4>
                    <div className="rating-box mb-3">
                      <Rating
                        name="prmoter-rating"
                        value={item?.rating}
                        readOnly
                      />
                    </div>
                    <p className="truncate-text">{item?.description}</p>
                    <div className="pro-location">
                      <span>
                        <Image
                          width={25}
                          height={25}
                          src="/images/promoter/pro-location.png"
                          alt=""
                        />{" "}
                        {item.location}
                      </span>
                    </div>
                    <Link
                      className="btn btn-viewmore"
                      href={`/promoters/${item?.id}`}
                      role="button"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        {Array.isArray(renderList) && renderList.length === 0 && (
          <div className="row">
            <p className="noDataText">No Promoter </p>
          </div>
        )}
        <CustomPagination
          dataArray={tempPromoterList}
          pageNo={pageNo}
          clickPageNumber={handlePageNumber}
          pageLimit={12}
        />
      </div>
    </div>
  );
};

export default ClientComponent;
