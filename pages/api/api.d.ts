type ApiResponse<T = object> = {
  status: int;
  message?: string;
  data?: T;
};
