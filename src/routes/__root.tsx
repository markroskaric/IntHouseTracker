import React from "react";
import BaseLayout from "@/layouts/BaseLayout";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import HomePage from "./inthouse/HomePage";
import ErrorPage from "@/pages/error-page";

export const RootRoute = createRootRoute({
    component: Root,
    errorComponent: ErrorPage,
});

function Root() {
    return (
        <BaseLayout>
            <HomePage />
        </BaseLayout>
    );
}
