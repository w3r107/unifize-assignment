import {
  ArrowDownToLineIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
const TransactionHeader = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <p className="text-[28px]">Transactions</p>
        <div className="flex gap-2">
          <ChevronLeft className="text-gray-300" />
          <ChevronRight />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="bg-gray-100 rounded-full flex items-center py-1 px-4 gap-2">
              {/* <p className="w-2"> */}
              <Filter size="14px" />

              <p className="text-gray-700 text-sm font-semibold">Add Filter</p>
            </div>
            <p className="text-gray-200 ml-1 mr-1">|</p>
            <p className="text-[#70707d] text-sm">No filters applied</p>
          </div>
          <div className="bg-gray-100 rounded-full flex items-center py-1 px-4 gap-2">
            <ArrowDownToLineIcon size="14px" />
            <p className="text-gray-700 text-sm">Export All</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;
