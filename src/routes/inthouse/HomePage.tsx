import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import LightStatus from "@/components/LightStatus.js";
import { PopoverBtn } from "@/components/PopoverBtn.js";
import { IntHouseProp } from "@/types.js";
import { fetchData } from "./Function";
import stringSimilarity from "string-similarity";

export default function HomePage() {
    const location = useLocation();
    const [intHouseData, setIntHouseData] = useState<IntHouseProp[]>([]);
    const [displayedIntHouseData, setDisplayedIntHouseData] = useState<IntHouseProp[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setSearchInput] = useState("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchInput(value);

        if (value.trim() === "") {
            setDisplayedIntHouseData(intHouseData);
            return;
        }

        const filteredData = intHouseData.filter((item) => {
            const similarity = stringSimilarity.compareTwoStrings(
                item.name.toLowerCase(),
                value.toLowerCase()
            );
            return similarity > 0.3;
        });

        setDisplayedIntHouseData(filteredData);
    };

    const newUser: IntHouseProp = {
        inHouse_ID: 0,
        inHouse_app_id: "",
        hub_ID: "",
        name: "",
        cloudConnection: "",
        password: "",
        username: "",
        lastStatus: {
            status: "",
            response: "",
            date: "",
            time: "",
        },
    };

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const result = await fetchData();
            if (result) {
                setIntHouseData(result);
                setDisplayedIntHouseData(result);
            } else {
                setError("Failed to fetch data");
            }
            setLoading(false);
        };

        getData();
    }, [location]);
    const handleLinkClick = () => {
        setSearchInput("");
    };
    return (
        <>
            <div id="root">
                <div id="sidebar">
                    <div>
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <div className="sr-only" aria-live="polite"></div>
                        <Link to="/Edit" state={{ data: newUser }}>
                            <button id="btnSubmit" type="submit">
                                New
                            </button>
                        </Link>
                    </div>
                    <nav>
                        {displayedIntHouseData.length ? (
                            <ul>
                                {displayedIntHouseData.map((item: IntHouseProp, index: number) => (
                                    <li key={index} className="">
                                        <Link
                                            to="/IntHouse"
                                            state={{ data: item }}
                                            onClick={handleLinkClick}
                                        >
                                            <div className="my-3 flex cursor-pointer flex-row items-center justify-between rounded-xl border border-gray-300 p-2">
                                                <div>
                                                    <LightStatus
                                                        status={Number(item.lastStatus.status)}
                                                    ></LightStatus>
                                                </div>
                                                <div>{item.name}</div>

                                                <div>
                                                    <PopoverBtn data={item}></PopoverBtn>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>
                                <i>No connections</i>
                            </p>
                        )}
                    </nav>

                    <h1>
                        <Link to="/">IntHouseTracker </Link>
                    </h1>
                </div>
                <div id="detail">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
