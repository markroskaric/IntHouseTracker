import DeviceName from "@/components/DeviceName";
import OpenInBrowserIndicator from "@/components/OpenInBrowserIndicator";
import ServerStatusHistoryChart from "@/components/ServerStatusHistoryChart";
import ServerStatusIndicator from "@/components/ServerStatusIndicator";
import { useLocation } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { getLast100StatisticsByFieldID } from "./Function";
import QRCodeGenerator from "@/components/QRCodeGenerator";

export default function IntHouse() {
    const location = useLocation();
    const user = location.state?.data;

    const [inthouseStatusDate, setInhouseStatusDate] = useState(null);

    useEffect(() => {
        const fetchInhouseStatusDate = async () => {
            try {
                const data = await getLast100StatisticsByFieldID(user.inHouse_ID);
                setInhouseStatusDate(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };

        fetchInhouseStatusDate();
    }, [location]);
    let isOnline;
    switch (true) {
        case Number(user.lastStatus.response) >= 200 && Number(user.lastStatus.response) <= 299:
            isOnline = true;
            break;
        default:
            isOnline = false;
            break;
    }
    return (
        <div className="mb-4 rounded-lg bg-blue-50 p-4 text-center shadow-md">
            <DeviceName name={user.name} />
            <div className="flex flex-row justify-between">
                <div>
                    <ServerStatusIndicator
                        text={user.name}
                        isOnline={isOnline}
                    ></ServerStatusIndicator>
                </div>
                <div>
                    <OpenInBrowserIndicator isOnline={isOnline} link={user.cloudConnection} />
                </div>
            </div>
            <div>
                <ServerStatusHistoryChart data={inthouseStatusDate} />
            </div>
            <div className="flex justify-center pt-2">
                <QRCodeGenerator url={`https://inthouse.eu/id/${user.inHouse_app_id}`} />
            </div>
        </div>
    );
}
