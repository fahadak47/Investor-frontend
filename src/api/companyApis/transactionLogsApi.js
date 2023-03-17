import { apiHandle } from "../apiHandler";

export const getTransactionLogsAPi = () => {
  return apiHandle().get("/company/auth/transactionLogs");
};

export const getMinimumDays = () => {
  return apiHandle().get("/company/auth/activeSchedule/minimumDays");
};
