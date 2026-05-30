import axios from "axios";

export const startJob = async (customerId, itemIds) => {
  const req = {
    customerId: customerId,
    itemIds: itemIds
  };

  const res = await axios.post(
    "http://localhost:8080/ui/job/start",
    req
  );

  return res.data;
};
