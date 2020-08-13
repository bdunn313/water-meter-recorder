import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Reading } from "@prisma/client";

const prisma = new PrismaClient();

type PatchResponse = {
  reading: Reading;
};

type DeleteResponse = {
  id: number;
};

type GetResponse = {
  reading: Reading;
};

const parseId = (id: string | string[]): number => {
  if (Array.isArray(id)) {
    throw "Not a valid ID.";
  }
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    throw "Not a valid ID.";
  }
  return parsedId;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    ApiResponse<PatchResponse | DeleteResponse | GetResponse>
  >
): Promise<void> => {
  try {
    const id = parseId(req.query.id);
    switch (req.method) {
      case RequestMethod.PATCH:
        if (Array.isArray(req.query.value)) {
          throw "Invalid argument: value must be a number.";
        }
        const value = parseFloat(req.query.value);
        const updatedReading = await prisma.reading.update({
          where: { id },
          data: { value },
        });
        res.status(200).json({
          status: 200,
          message: "Updated successfully",
          data: { reading: updatedReading },
        });
        break;

      case RequestMethod.DELETE:
        await prisma.reading.delete({ where: { id } });
        res.status(200).json({
          status: 200,
          message: "Reading removed successfully",
          data: { id },
        });
        break;

      case RequestMethod.GET:
        const reading = await prisma.reading.findOne({
          where: { id },
        });
        if (!reading) {
          res.status(404).json({ status: 404, message: "Record not found." });
          return;
        }
        res.status(200).json({ status: 200, data: { reading } });
        break;

      default:
        throw "Bad request.";
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
