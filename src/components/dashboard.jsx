import React from "react";
import { Sidebar } from "flowbite-react";

const Dashboard = () => {
  return (
    <>
      <div className="w-fit h-full m-0 p-0">
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items className="h-screen bg-gray-300">
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                //   icon={HiChartPie}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Collapse
                //   icon={HiShoppingBag}
                label="E-commerce"
              >
                <Sidebar.Item href="#" className="">
                  Products
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item
                href="#"
                //   icon={HiInbox}
              >
                Inbox
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                //   icon={HiUser}
              >
                Users
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                //   icon={HiShoppingBag}
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                //   icon={HiArrowSmRight}
              >
                Sign In
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                //   icon={HiTable}
              >
                Sign Up
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
};

export default Dashboard;
