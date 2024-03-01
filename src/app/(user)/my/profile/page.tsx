"use client";
import { BASE_URL } from "@/constant/constant";
import useLocalStorage from "@/constant/useLocalStorage";
import { postFetchDataWithAuth } from "@/fetchData/fetchApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddressAutoComplete from "@/components/AddressAutoComplete";

const Profile = () => {
  const [edit, setEdit] = useState(true);
  const [reload, setReload] = useState(false);
  const [userImage, setuserImage] = useState("");
  const [localStorage, setLocalStorage] = useLocalStorage<any>(
    "loginUser",
    null
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  useEffect(() => {
    async function fetchEffect() {
      try {
        const response = await postFetchDataWithAuth({
          data: { user_id: localStorage.user_details.user_id },
          endpoint: "user_get_profile",
          authToken: localStorage.token,
        });
        if (response?.data?.user_signup_status === "1") {
          setValue("email", response.data.email);
          setValue("name", response.data.name);
          setValue("phone", response.data.phone);
          setValue("address", response.data.location);
          setValue("latitude", response.data.latitude);
          setValue("longitude", response.data.longitude);
          setuserImage(response.data.profile_image);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    }
    fetchEffect();
  }, [reload]);
  const onSubmit = async (data: any) => {
    try {
      const formdata = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        user_id: localStorage.user_details.user_id,
        location: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      };
      if (typeof data.profile_image[0] === "object") {
        formdata["profile_image"] = data?.profile_image[0];
      }
      const response = await postFetchDataWithAuth({
        data: formdata,
        endpoint: "user_update_profile",
        authToken: localStorage.token,
      });
      if (response.success) {
        setReload(!reload);
        toast.success(response.message);
        setEdit(true);
      } else {
        throw response;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  const handlePlaceSelect = (place, inputRef) => {
    setValue("address", inputRef.value);
    setValue("latitude", place.geometry.location.lat());
    setValue("longitude", place.geometry.location.lng());
  };

  return (
    <>
      <div className="user-dashboard-data">
        <div className="user-my-profile">
          <h1>My Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user-pro-in">
              <div className="user-image">
                <Image
                  width={96}
                  height={96}
                  style={{ borderRadius: 999 }}
                  src={
                    userImage
                      ? `${BASE_URL}${userImage}`
                      : "/images/user-dashboard/my-profile/profile.png"
                  }
                  alt=""
                />
              </div>
              {!edit && (
                <label className="user-upload-icon">
                  <Image
                    width={19}
                    height={14}
                    src="/images/user-dashboard/my-profile/upload.svg"
                    alt=""
                  />
                  <input
                    type="file"
                    id="profile_image"
                    hidden
                    {...register("profile_image")}
                  />
                </label>
              )}
            </div>

            <div className="user-label">
              <div className="user-label-icon">
                <Image
                  width={25}
                  height={25}
                  src="/images/user-dashboard/my-profile/icons/1.svg"
                  alt=""
                />
              </div>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                type="text"
                style={{ border: errors.name ? "1px solid red" : "" }}
                readOnly={edit}
                placeholder="Full Name"
              />
            </div>

            <div className="user-label">
              <div className="user-label-icon">
                <Image
                  width={25}
                  height={25}
                  src="/images/user-dashboard/my-profile/icons/2.svg"
                  alt=""
                />
              </div>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address",
                  },
                })}
                type="text"
                style={{ border: errors.email ? "1px solid red" : "" }}
                readOnly={
                  edit || localStorage.user_details.login_type === "email"
                }
                placeholder="Email"
              />
            </div>

            <div className="user-label">
              <div className="user-label-icon">
                <Image
                  width={25}
                  height={25}
                  src="/images/user-dashboard/my-profile/icons/3.svg"
                  alt=""
                />
              </div>
              <input
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Number is required",
                  },
                  minLength: 10,
                  pattern: /[0-9]/,
                })}
                type="text"
                maxLength={10}
                style={{ border: errors.phone ? "1px solid red" : "" }}
                readOnly={
                  edit || localStorage.user_details.login_type === "phone"
                }
                placeholder="Phone number"
              />
            </div>

            <AddressAutoComplete
              defaultValue={getValues("address")}
              edit={edit}
              register={register("address")}
              errors={errors}
              onSelectPlace={handlePlaceSelect}
            />

            <div>
              <input type="hidden" id="latitude" {...register("latitude")} />

              <input type="hidden" id="longitude" {...register("longitude")} />
            </div>
            <div className="user-label-btn">
              <input
                onClick={() => setEdit(false)}
                type="button"
                value="Edit"
              />
              <input type="submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
