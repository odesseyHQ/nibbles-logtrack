import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const authorizationToken = import.meta.env.VITE_APP_AUTHORIZATION_TOKEN;
const fetchProjectList = async () => {
  const url = `${baseUrl}/project`;
  const requestBody = {
    filter: {},
    sort: {
      sortKey: "projectId",
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
    throw new Error("Failed to fetch project list");
  }
};
export const useProjectList = () => {
  return useQuery(["projectList"], fetchProjectList);
};

export const useCreateProjectForm = (
  onSuccessCallBack?: VoidFunction,
  onErrorCallBack?: VoidFunction
) => {
  const toast = useToast();

  const CREATE_PROJECT = `${baseUrl}/project/create`;
  const headers = {
    Authorization: authorizationToken,
    "Content-Type": "application/json",
  };
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_payload) => {
      const res = axios
        .post(CREATE_PROJECT, _payload, { headers })
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          throw new Error(`error occurred => ${JSON.stringify(err)}`);
        });
      return res;
    },
    onSuccess: (response: any) => {
      if (onSuccessCallBack) {
        onSuccessCallBack();
      } else {
        toast({
          title: "Success",
          position: "top-right",
          isClosable: true,
          status: "success",
          duration: 3000,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
    },

    onError: (error: any) => {
      onErrorCallBack
        ? onErrorCallBack()
        : toast({
            title: "Error",
            position: "top-right",
            isClosable: true,
            status: "error",
            duration: 3000,
          });
      console.error("API POST **failed, error ->", error);
    },
    retry: 0,
  });
};
