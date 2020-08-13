import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Reading } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  readings: Reading[];
};

export default async (
  _req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Data>>
) => {
  const readings = await prisma.reading.findMany();
  res.status(200).json({ status: 200, data: { readings } });
};
