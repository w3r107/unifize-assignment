import dayjs from "dayjs";
import { useState } from "react";
import UserAvatar from "../common/UserAvatar";
import { CircleDollarSignIcon } from "lucide-react";
import DownArrow from "@/assets/Icons/DownArrow";
import TransactionHeader from "./TransactionHeader";

export type Transaction = {
  id: string;
  date: string;
  to_from: string;
  amount: string;
  account: string;
  payment_method: string;
  isCredit: boolean;
};

interface TransactionTableProps {
  data: Transaction[];
}

const tableHeaders = [
  { label: "Date (GMT+5:30)", key: "date", align: "center" },
  { label: "", key: "nothing", align: "center" },

  { label: "To/From", key: "to_from", align: "center" },
  { label: "Amount", key: "amount", align: "right" },
  { label: "Account", key: "account", align: "center" },
  {
    label: "Payment Method",
    key: "payment_method",
    align: "center",
  },
  { label: "Attachment", key: "attachment", align: "center" },
];

const giveAmountSeperatedByDecimal = (amount: string) => {
  const amountSplit = amount.split(".");

  let beforeDecimal = "";
  let afterDecimal = "";
  beforeDecimal = amountSplit[0];
  if (amountSplit.length > 1) {
    afterDecimal = "." + amountSplit[1];
  }

  // return amountSplit[0];
  return {
    beforeDecimal,
    afterDecimal,
  };
};

const giveCorrectPaymentMethod = (paymentMethod: string) => {
  const splited = paymentMethod.split("-");
  const capitalized = splited.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalized.join(" ");
};

export function TransactionTable({ data }: TransactionTableProps) {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // Sort according to date because I have generated data from mockaroo
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // to convert date to Dec 6 like this
  const formattedData = sortedData.map((row) => {
    return {
      ...row,
      date: dayjs(row.date).format("MMM D"),
    };
  });

  return (
    <div className="w-full">
      <TransactionHeader />
      <div className="mt-4">
        {/* table headers */}
        <div className="grid grid-cols-[110px_4px_1fr_120px_150px_200px_100px] items-center border-b sticky top-0 bg-white z-10">
          {tableHeaders.map((header) => (
            <div
              key={header.key}
              className={`p-2 text-[12px] text-gray-600 font-normal ${
                header.align === "right" ? "text-right" : "text-left"
              }`}
            >
              {/* {header.key === "date" ? (
                <div className="gap-2">
                  {header.label}
                  <div className="w-2">
                    <DownArrow />
                  </div>
                </div>
              ) : (
                header.label
              )} */}
              {header.key === "date" ? (
                <div className="gap-2">
                  {header.label}
                  <div className="w-2">
                    <DownArrow />
                  </div>
                </div>
              ) : header.key === "payment_method" ? (
                <div className="flex gap-1 items-center">
                  <CircleDollarSignIcon size="14px" />
                  {header.label}
                </div>
              ) : (
                header.label
              )}
            </div>
          ))}
        </div>

        {/* table body */}
        {formattedData.length ? (
          formattedData.map((row, index) => (
            <div
              key={row.id}
              className={`grid grid-cols-[110px_60px_1fr_120px_150px_200px_100px]  hover:bg-gray-100 cursor-pointer ${
                index === 0 ? "border-b" : ""
              }`}
              onMouseEnter={() => setHoveredRowId(row.id)}
              onMouseLeave={() => setHoveredRowId(null)}
            >
              <div
                className={`p-2 text-sm text-gray-600 flex items-center  ${
                  hoveredRowId === row.id ? "text-gray-900" : ""
                }`}
              >
                {row.id === hoveredRowId
                  ? row.date
                  : index > 0
                  ? formattedData[index - 1].date === row.date
                    ? ""
                    : row.date
                  : row.date}
              </div>

              <div className="p-2 text-sm text-gray-600">
                <UserAvatar name={row.to_from} />
              </div>
              <div
                className={`p-2 flex gap-2 items-center text-sm ${
                  index != 0 && "border-b"
                } `}
              >
                {row.to_from}
              </div>

              <div
                className={`p-2 text-sm  ${
                  index != 0 && "border-b"
                } flex items-center justify-end ${
                  row?.isCredit ? "text-green-600" : "text-gray-600"
                }`}
              >
                <div className="flex items-start justify-end ">
                  {row?.isCredit ? "" : "-"}
                  {giveAmountSeperatedByDecimal(row?.amount).beforeDecimal}
                  <span className="text-xs leading-none">
                    {giveAmountSeperatedByDecimal(row?.amount).afterDecimal}
                  </span>
                </div>
              </div>

              <div
                className={`p-2 text-sm text-gray-600 flex items-center ${
                  index != 0 && "border-b"
                }`}
              >
                {row.account}
              </div>

              <div
                className={`p-2 text-sm text-gray-600 flex items-center ${
                  index != 0 && "border-b"
                }`}
              >
                {giveCorrectPaymentMethod(row.payment_method)}
              </div>

              <div
                className={`p-2 flex  text-sm pl-6 ${index != 0 && "border-b"}`}
              >
                <UserAvatar otherThings={"+"} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 col-span-6">No results.</div>
        )}
      </div>
    </div>
  );
}

export default TransactionTable;
