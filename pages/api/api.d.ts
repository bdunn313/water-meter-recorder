type ApiResponse<T = object> = {
  status: int;
  message?: string;
  data?: T;
};

enum RequestMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
