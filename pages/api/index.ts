import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "./types";

export default (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  res.status(200).json({ status: 200, message: "I'm alive!" });
};
