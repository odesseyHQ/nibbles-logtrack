const transformRequestToResponseData = (data: any) => {
  const { results, projectData } = data;
  try {
    const response = {
      id: results?.logId,
      log: results?.logText,
      meta: results?.meta ?? '',
      logType: results?.logType,
      status: results?.status ?? null,
      project: {
        id: projectData?.projectId,
        projectCode: projectData?.projectCode,
      },
      createdAt: results?.created_at,
    };
    return response;
  } catch (error) {
    console.log('Error while transforming data : ', error);
  }
};

export { transformRequestToResponseData };
