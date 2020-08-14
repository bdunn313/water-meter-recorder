export type ApiResponse<T = object> = {
  status: number;
  message?: string;
  data?: T;
};

export enum RequestMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
