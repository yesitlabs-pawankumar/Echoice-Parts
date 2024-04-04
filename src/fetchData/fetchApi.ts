import { toast } from "react-toastify";
import { BASE_URL } from "../constant/constant";

type PostDataOptions = {
  data: Record<string, any>;
  endpoint: string;
};

type PostDataWithAuthOptions = {
  data: Record<string, any>;
  endpoint: string;
  authToken: string;
};

export const getFormData = (object: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

export const postData = async ({ data, endpoint }: PostDataOptions) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
      method: "POST",
      body: getFormData(data),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    if (!result.success) {
      return result.message;
    }
    if (result.error) {
      throw result.error;
    }
  } catch (error) {
    return error;
  }
};
export const postDataWithoutAuth = async ({
  data,
  endpoint,
}: PostDataOptions) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
      method: "POST",
      body: getFormData(data),
    });
    const result = await response.json();
    if (result.success) {
      console.log("result", result);
      return result.data[0];
    }
    if (!result.success) {
      return result.message;
    }
    if (result.error) {
      throw result.error;
    }
  } catch (error) {
    return error;
  }
};

export const postDataWithAuth = async ({
  data,
  endpoint,
  authToken,
}: PostDataWithAuthOptions) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: getFormData(data),
    });
    const result = await response.json();
    if (result.success) {
      return result.data[0];
    }
    if (!result.success) {
      throw result.message;
    }
    if (result.error) {
      throw result.error;
    }
  } catch (error) {
    return error;
  }
};

export const postFetchDataWithAuth = async ({
  data,
  endpoint,
  authToken,
}: PostDataWithAuthOptions) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: getFormData(data),
    });
    const result = await response.json();
    if (result.success) {
      return result;
    }
    if (!result.success) {
      throw result.message;
    }
    if (result.error) {
      throw result.error;
    }
  } catch (error: any) {
    return error;
  }
};
