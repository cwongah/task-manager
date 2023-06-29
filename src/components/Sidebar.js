import React from "react";

function Sidebar({sidebarToggle, setSidebarToggle}){
    return (
        <div>
            <div
                className={`${
                    sidebarToggle
                        ? "md:left-0 w-full"
                        : "md:left-[-300px] w-0"
                } transition-all duration-500 ease-in-out md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 overflow-hidden`}
                style={{ left: sidebarToggle ? "0" : "-300px" }}
            >
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto bg-white ">
                    sidebar
                </div>
            </div>
        </div>
    )
}

export default Sidebar