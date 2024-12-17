import { IntHouseProp, InthousePropAdd, InthousePropUpdate } from "@/types";

export const fetchData = async () => {
    try {
        const response = await fetch("https://localhost:7197/IntHouse");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Return null or handle the error as needed
    }
};
export const UpdateData = async (id: number, updatedData: InthousePropUpdate): Promise<void> => {
    const Upate = {
        inHouse_ID: updatedData.inHouse_ID,
        inHouse_app_id: updatedData.inHouse_app_id,
        hub_ID: updatedData.hub_ID,
        name: updatedData.name,
        password: updatedData.password,
        username: updatedData.username,
    };
    try {
        const response = await fetch(`https://localhost:7197/IntHouse/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Upate),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Update successful:", result);
    } catch (error) {
        console.error("Failed to update data:", error);
    }
};
// Function to fetch the count of InthouseProp objects
export const fetchInthouseCount = async (): Promise<number> => {
    try {
        const response = await fetch("https://localhost:7197/IntHouse/count"); // Adjust the URL to match your API route
        if (!response.ok) {
            throw new Error("Failed to fetch count");
        }
        const count = await response.json();
        return count;
    } catch (error) {
        console.error("Error fetching Inthouse count:", error);
        throw error; // You can also handle this differently, e.g., return a default value
    }
};
export async function addIntHouseObject(inthouseObject: InthousePropAdd) {
    // Define the API endpoint
    const apiUrl = "https://localhost:7197/IntHouse"; // Adjust the URL as necessary

    // Ensure the input object is valid
    if (!inthouseObject || typeof inthouseObject !== "object") {
        console.error("Invalid input object.");
        return;
    }

    try {
        // Send a POST request to the API
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specify content type as JSON
            },
            body: JSON.stringify(inthouseObject), // Convert the object to a JSON string
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            const errorText = await response.text(); // Read the error message from the response
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("Object added successfully:", data);
        return data; // Return the response data if needed
    } catch (error) {
        console.error("Error adding object:", error);
    }
}
export async function deleteIntHouseObject(id: number): Promise<void> {
    // Define the API endpoint
    const apiUrl = `https://localhost:7197/IntHouse/${id}`; // Adjust the URL as necessary

    // Check if the provided ID is valid
    if (!id || typeof id !== "number") {
        console.error("Invalid ID provided.");
        return;
    }

    try {
        // Send a DELETE request to the API
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", // Specify content type as JSON
            },
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            const errorText = await response.text(); // Read the error message from the response
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        console.log(`Inthouse object with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting object:", error);
    }
}
export async function getLast100StatisticsByFieldID(id: number) {
    // Define the API endpoint
    const apiUrl = `https://localhost:7197/api/Statistics/byfield/${id}/last100dates`; // Adjust the URL as necessary

    // Check if the provided ID is valid
    if (!id || typeof id !== "number") {
        console.error("Invalid ID provided.");
        return null;
    }

    try {
        // Send a GET request to the API
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Specify content type as JSON
            },
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            const errorText = await response.text(); // Read the error message from the response
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();
        console.log(`Fetched ${data.length} statistics records successfully.`);
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching statistics:", error);
        return null; // Return null if there's an error
    }
}
export const generateServerStatusData = () => {
    const serverStatusData = [];
    const now = new Date(); // Get the current time

    // Generate the last 20 statuses, including the current time
    for (let i = 0; i < 20; i++) {
        // Calculate the time for each entry (in this example, each entry is an hour apart)
        const time = new Date(now.getTime() - i * 60 * 60 * 1000); // Subtract hours from the current time

        // Generate a random status (1 for online, 0 for offline)
        const status = 1;

        // Push the new status entry into the array
        serverStatusData.push({
            time: time.toISOString(), // Convert the time to ISO format
            status: status,
        });
    }

    return serverStatusData.reverse(); // Reverse to have the oldest entry first
};
