import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FilterInf } from "../LogTable";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const authorizationToken = import.meta.env.VITE_APP_AUTHORIZATION_TOKEN;

const fetchLogsList = async (filter: FilterInf) => {
  const url = `${baseUrl}/logs/all`;
  const requestBody = {
    filter,
    sort: {
      sortKey: "logId",
      sortOrder: "ASC",
    },
    limit: 20,
    offset: 0,
  };
  const headers = {
    Authorization: authorizationToken,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch logs list");
  }
};
export const useLogsList = (filter: FilterInf) => {
  return useQuery(["logsList", filter], () => fetchLogsList(filter));
};

const fetchSingleLog = async (logId: any) => {
  const url = `${baseUrl}/logs/${logId}`;
  const headers = {
    Authorization: authorizationToken,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { headers });
    return response?.data;
  } catch (error) {
    throw new Error("Failed to fetch logs list");
  }
};
export const useSingleLog = (logId: any) => {
  return useQuery(["singlelog"], () => fetchSingleLog(logId));
};
