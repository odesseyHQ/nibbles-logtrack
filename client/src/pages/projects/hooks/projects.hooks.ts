import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const authorizationToken = import.meta.env.VITE_APP_AUTHORIZATION_TOKEN;

const fetchProjectList = async (filter: any) => {
  const url = `${baseUrl}/project`;
  const requestBody = {
    filter,
    sort: {
      sortKey: "projectId",
      sortOrder: "ASC",
    },
    limit: 30,
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
export const useProjectList = (filter: any) => {
  return useQuery(["projectList", filter], () => fetchProjectList(filter));
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
    onSuccess: () => {
      if (onSuccessCallBack) {
        onSuccessCallBack();
      } else {
        toast({
          title: "Successfully created the project",
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
            title: "Error!Something went wrong",
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

export const useEditProjectForm = (
  projectId: string | null,
  onSuccessCallBack?: VoidFunction,
  onErrorCallBack?: VoidFunction
) => {
  const toast = useToast();
  const CREATE_PROJECT = `${baseUrl}/project/edit/${projectId}`;
  const headers = {
    Authorization: authorizationToken,
    "Content-Type": "application/json",
  };
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_payload) => {
      const res = axios
        .put(CREATE_PROJECT, _payload, { headers })
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          throw new Error(`error occurred => ${JSON.stringify(err)}`);
        });
      return res;
    },
    onSuccess: () => {
      if (onSuccessCallBack) {
        onSuccessCallBack();
      } else {
        toast({
          title: "Successfully edited the project",
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
            title: "Error!Something went wrong",
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
