import DevicesOnNetworkIndicator from "@/components/DevicesOnNetworkIndicator";
import ServerStatusHistoryChart from "@/components/ServerStatusHistoryChart";
import ServerStatusIndicator from "@/components/ServerStatusIndicator";
import React, { useEffect, useState } from "react";
import { fetchInthouseCount, generateServerStatusData } from "./Function";
import { useLocation } from "@tanstack/react-router";
export default function Index() {
    const location = useLocation();
    const [inthouseCount, setInhouseCount] = useState<number>(0);
    const serverStatusData = generateServerStatusData();
    useEffect(() => {
        const getCount = async () => {
            const count = await fetchInthouseCount();
            setInhouseCount(count);
        };
        getCount();
    }, [location]);
    let ServerOnline;
    if (inthouseCount === 0) {
        ServerOnline = false;
    } else {
        ServerOnline = true;
    }

    return (
        <>
            <div className="mb-4 rounded-lg bg-blue-50 p-4 text-center shadow-md">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between gap-3">
                        <div>
                            <ServerStatusIndicator
                                text={"Server"}
                                isOnline={ServerOnline}
                            ></ServerStatusIndicator>
                        </div>
                        <div>
                            <DevicesOnNetworkIndicator deviceCount={inthouseCount} />
                        </div>
                    </div>
                    <div>
                        <ServerStatusHistoryChart data={serverStatusData} />
                    </div>
                </div>
            </div>
        </>
    );
}
