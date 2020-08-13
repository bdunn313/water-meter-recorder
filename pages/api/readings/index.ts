import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Reading } from "@prisma/client";

const prisma = new PrismaClient();

type GetResponse = {
  readings: Reading[];
};

type PostResponse = {
  reading: Reading;
};

const createReading = async (value: string | string[]): Promise<Reading> => {
  if (Array.isArray(value)) {
    throw "An array of values is not valid. Pass in an single string instead";
  }
  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    throw "Invalid argument. Must pass in a number.";
  }
  const newReading = await prisma.reading.create({
    data: { value: parsed },
  });
  return newReading;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<GetResponse | PostResponse>>
): Promise<void> => {
  try {
    switch (req.method) {
      case RequestMethod.POST:
        const reading = await createReading(req.query.value);
        res.status(200).json({ status: 200, data: { reading } });
        break;
      case RequestMethod.GET:
        const readings = await prisma.reading.findMany();
        res.status(200).json({ status: 200, data: { readings } });
        break;
      default:
        throw "Bad request.";
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
