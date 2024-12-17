import React, { useState } from "react";

import { useForm } from "@tanstack/react-form";
import { IntHouseProp } from "@/types";
import type { FieldApi } from "@tanstack/react-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import eye icons
import { addIntHouseObject, UpdateData } from "./Function";
import { useLocation, useRouter } from "@tanstack/react-router";
import { RootRoute } from "../__root";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em style={styles.errorText}>{field.state.meta.errors.join(", ")}</em>
            ) : null}
            {field.state.meta.isValidating ? "Validating..." : null}
        </>
    );
}

export default function Edit() {
    const router = useRouter(); // Get the router instance
    const location = useLocation();
    const user = location.state?.data;
    const form = useForm({
        defaultValues: {
            InHouse_ID: user?.inHouse_ID ?? 0,
            InHouse_app_id: user?.inHouse_app_id ?? "",
            Hub_ID: user?.hub_ID ?? "",
            Name: user?.name ?? "",
            Password: user?.password ?? "",
            Username: user?.username ?? "",
        },
        onSubmit: async ({ value }) => {
            // Handle form submission
            if (value.InHouse_ID === 0) {
                const AddNewProp = {
                    inHouse_ID: value.InHouse_ID,
                    inHouse_app_id: value.InHouse_app_id,
                    hub_ID: value.Hub_ID,
                    name: value.Name,
                    password: value.Password,
                    username: value.Username,
                };
                await addIntHouseObject(AddNewProp);
            } else {
                const UpdateProp = {
                    inHouse_ID: value.InHouse_ID,
                    inHouse_app_id: value.InHouse_app_id,
                    hub_ID: value.Hub_ID,
                    name: value.Name,
                    password: value.Password,
                    username: value.Username,
                };
                await UpdateData(value.InHouse_ID, UpdateProp);
            }
            router.navigate(RootRoute);
        },
    });

    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

    return (
        <div style={styles.container}>
            <form
                style={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <div style={styles.fieldContainer}>
                    <form.Field
                        name="InHouse_app_id"
                        initialValue="C-" // Set initial value to "C-" for InHouse_app_id
                        validators={{
                            required: "InHouse app ID is required.",
                            onChange: ({ value }) => {
                                const regex = /^C-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;

                                if (!regex.test(value)) {
                                    return "InHouse app ID must follow the format C-XXXX-XXXX-XXXX";
                                }
                                return undefined; // No error
                            },
                        }}
                        children={(field) => (
                            <>
                                <label htmlFor={field.name} style={styles.label}>
                                    InHouse app ID:
                                </label>
                                <input
                                    placeholder="C-XXXX-XXXX-XXXX"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        let inputValue = e.target.value;
                                        if (
                                            inputValue.length === 1 &&
                                            inputValue[inputValue.length - 1] != "C"
                                        ) {
                                            inputValue = "C-" + inputValue;
                                        }
                                        if (inputValue.length === 6 || inputValue.length === 11) {
                                            inputValue += "-";
                                        }
                                        // Ensure the input always starts with "C-"
                                        console.log(inputValue[inputValue.length - 1]);
                                        // Limit to a maximum of 16 characters
                                        inputValue = inputValue.slice(0, 16);

                                        field.handleChange(inputValue);
                                    }}
                                    style={styles.input}
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    />
                </div>

                <div style={styles.fieldContainer}>
                    <form.Field
                        name="Hub_ID"
                        validators={{
                            required: "Hub ID is required.",
                        }}
                        children={(field) => (
                            <>
                                <label htmlFor={field.name} style={styles.label}>
                                    Hub ID or IP with port:
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    style={styles.input}
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    />
                </div>

                <div style={styles.fieldContainer}>
                    <form.Field
                        name="Name"
                        validators={{
                            required: "Name is required.",
                        }}
                        children={(field) => (
                            <>
                                <label htmlFor={field.name} style={styles.label}>
                                    Name:
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    style={styles.input}
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    />
                </div>

                <div style={styles.fieldContainer}>
                    <form.Field
                        name="Username"
                        validators={{
                            required: "Username is required.",
                        }}
                        children={(field) => (
                            <>
                                <label htmlFor={field.name} style={styles.label}>
                                    Username:
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    style={styles.input}
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    />
                </div>

                <div style={styles.fieldContainer}>
                    <form.Field
                        name="Password"
                        validators={{
                            required: "Password is required.",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long.",
                            },
                        }}
                        children={(field) => (
                            <>
                                <label htmlFor={field.name} style={styles.label}>
                                    Password:
                                </label>
                                <div style={styles.passwordContainer}>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={passwordVisible ? "text" : "password"} // Toggle between text and password
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        style={styles.input}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                                        style={styles.eyeButton}
                                    >
                                        {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}{" "}
                                        {/* Eye icon */}
                                    </button>
                                </div>
                                <FieldInfo field={field} />
                            </>
                        )}
                    />
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <button type="submit" disabled={!canSubmit} style={styles.submitButton}>
                            {isSubmitting ? "..." : "Submit"}
                        </button>
                    )}
                />
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        borderRadius: "8px",
        backgroundColor: "#fff", // White background
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Enhanced shadow for depth
        margin: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        maxWidth: "400px", // Max width for better layout on larger screens
    },
    fieldContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the left
    },
    label: {
        fontSize: "14px",
        color: "#333", // Dark text color
        fontWeight: "500",
        marginBottom: "8px",
        textAlign: "left", // Left align label
        width: "100%", // Ensures label takes full width
    },
    input: {
        padding: "10px",
        border: "1px solid #e3e3e3",
        borderRadius: "4px",
        fontSize: "14px",
        color: "#333",
        outline: "none",
        transition: "border 0.2s",
        width: "100%", // Full width input
        "&:focus": {
            borderColor: "#3992ff", // Blue border on focus
        },
    },
    passwordContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    eyeButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0 10px",
        color: "#3992ff", // Color for the eye icon
        fontSize: "20px",
        height: "100%", // Match the height of the input field
        display: "flex", // Use flexbox to center the icon
        alignItems: "center", // Center icon vertically
    },
    submitButton: {
        padding: "10px 15px",
        backgroundColor: "#3992ff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
        "&:hover": {
            backgroundColor: "#2979ff", // Darker blue on hover
        },
        "&:disabled": {
            backgroundColor: "#e3e3e3", // Gray background when disabled
            cursor: "not-allowed",
        },
    },
    errorText: {
        color: "red",
        fontSize: "12px",
        marginTop: "4px",
    },
};
