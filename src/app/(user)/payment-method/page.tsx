"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dialog from "./components/Dialog";
import { useAuth } from "@/app/UserProvider";
import { toast } from "react-toastify";
import { postFetchDataWithAuth } from "@/fetchData/fetchApi";
import AddCard from "@/app/voopons/[detail]/components/Modal/addCard";

const PaymentMethod = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, userDetails } = useAuth();
  const [cardList, setCardList] = useState<any[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  useEffect(() => {
    fetchCardList();
  }, [isAuthenticated]);
  const fetchCardList = async () => {
    try {
      const response = await postFetchDataWithAuth({
        data: { user_id: userDetails.user_id },
        endpoint: "user_AllCard",
        authToken: userDetails.token,
      });
      if (response?.data) {
        setCardList(response?.data);
      } else {
        throw response;
      }
    } catch (error: any) {
      const errorMessage = error?.message || `${error}`;
      toast.error(errorMessage);
    }
  };
  const userCardSave = async (tok: any) => {
    try {
      const response = await postFetchDataWithAuth({
        data: { user_id: userDetails?.user_id, token: tok?.id },
        endpoint: "user_CardSave",
        authToken: userDetails.token,
      });
      if (response?.data) {
        setReload(!reload);
      } else {
        throw response;
      }
    } catch (error: any) {
      const errorMessage = error?.message || `${error}`;
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="user-dashboard-data">
        <div className="user-payment-method">
          {cardList?.length === 0 && (
            <>
              <div className="user-card-icon">
                <Image
                  width={100}
                  height={76}
                  src="/images/user-dashboard/payment-method/card-info-icon.svg"
                  alt=""
                />
              </div>
              <h1>You have no saved cards.</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commod o ligula eget dolor.
              </p>
            </>
          )}
          <a href="#" onClick={() => setOpen(true)}>
            Add Card
          </a>
        </div>
      </div>
      <AddCard open={open} setOpen={setOpen} callBack={userCardSave} />
    </>
  );
};

export default PaymentMethod;
