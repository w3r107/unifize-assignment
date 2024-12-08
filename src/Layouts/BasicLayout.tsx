import { Bell, ChevronDown, Search } from "lucide-react";
import React from "react";

interface IBasicLayoutProps {
  children: React.ReactNode;
}

const NavigationHeader = () => {
  return (
    <div className="w-full bg-white pr-4 py-2 ">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions or more"
              className="w-full text-[12px] font-semibold pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-3 flex gap-0.5">
              <div className=" text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                Ctrl
              </div>
              <div className=" text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                K
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 flex justify-end">
          <button className="flex items-center space-x-2 px-8 py-1.5 text-blue-600 hover:bg-gray-50 rounded-full border-2 border-gray-200 ">
            <span className="font-semibold text-sm">Move Money</span>

            <ChevronDown className="text-gray-400" />
          </button>
        </div>

        <div className="col-span-3 flex items-center justify-end space-x-4">
          <button className="p-2 bg-gray-50 rounded-full">
            <Bell size="14px" />
          </button>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-800">
            JB
          </div>
        </div>
      </div>
    </div>
  );
};

const sideNavbarItems = [
  {
    name: "Dashboard",
    icon: "DashboardIcon",
    link: "/dashboard",
  },
  {
    name: "Transactions",
    icon: "TransactionsIcon",
    link: "/transactions",
  },
  {
    name: "Accounts",
    icon: "AccountsIcon",
    link: "/accounts",
  },
  {
    name: "Cards",
    icon: "CardsIcon",
    link: "/cards",
  },
  {
    name: "Settings",
    icon: "SettingsIcon",
    link: "/settings",
  },
];
const BasicLayout = ({ children }: IBasicLayoutProps) => {
  const activeLink = "/transactions";
  return (
    <div className="flex h-screen ">
      {/* Fixed Sidebar */}
      <div className="w-64 h-full bg-white shadow-lg fixed left-0 top-0 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800">Logo</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {sideNavbarItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg ${
                  activeLink === item.link ? "bg-gray-100" : ""
                }`}
              >
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}

      <div className="ml-80 flex-1 px-8 mr-16">
        <div className="flex flex-col">
          <NavigationHeader />
          {children}
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
