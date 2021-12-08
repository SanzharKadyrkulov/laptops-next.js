import { NextApiRequest, NextApiResponse } from "next";
interface IdNextApiRequest extends NextApiRequest {
  query: {
    id?: string;
  };
}
export default function getById(req: IdNextApiRequest, res: NextApiResponse) {
  // res.statusCode = 200
  res.json({ yourId: req.query.id });
}
