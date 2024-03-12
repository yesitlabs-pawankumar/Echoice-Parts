"use client";
import { useAuth } from "@/app/UserProvider";
import { postData, postFetchDataWithAuth } from "@/fetchData/fetchApi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FollowerDetails({ promoter_id }) {
  const { isAuthenticated, userDetails } = useAuth();
  const [followerData, setFollowerData] = useState<any>({});
  const [reload, setReload] = useState<boolean>(false);
  const router = useRouter();
  let pathName = usePathname();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await postData({
          data: {
            user_id: userDetails?.user_id,
            promoter_id: promoter_id,
          },
          endpoint: "user_follow_get",
        });

        if (response) {
          let newData = {};
          if (typeof response[0] !== "object") {
            newData["noOfFollower"] = response[0];
          } else {
            newData = { ...response[0] };
            newData["noOfFollower"] = response[1];
          }

          setFollowerData(newData);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [userDetails?.user_id, reload]);

  const handleUnfollow = async () => {
    try {
      const formdata = {
        promoter_id: promoter_id,
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
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  const handlefollow = async () => {
    if (!isAuthenticated) {
      router.push(`/login?lastPath=${pathName}`);
    } else if (isAuthenticated) {
      try {
        const formdata = {
          promoter_id: promoter_id,
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
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    }
  };
  return (
    <div className="flowers">
      <span>
        <Image width={33} height={20} src="/images/followers-icon.png" alt="" />{" "}
        {followerData?.noOfFollower} Followers
      </span>
      <span>
        {(!followerData.hasOwnProperty("follow_status") ||
          followerData?.follow_status === "0") && (
          <a href="#" className="followers-btn" onClick={handlefollow}>
            Follow
          </a>
        )}
        {followerData?.follow_status && followerData?.follow_status === "1" && (
          <a href="#" className="followers-btn" onClick={handleUnfollow}>
            Unfollow
          </a>
        )}
      </span>
    </div>
  );
}
