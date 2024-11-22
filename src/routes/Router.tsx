import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Users from "../pages/users/Users"
import Camera from "../pages/camera/Camera"
import Configuration from "../pages/configuration/Configuration"
import PageNotFound from "../pages/pagenotfound/PageNotFound"

const Router = () => {

    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <Layout />,
                children: [
                    {
                        path: "",
                        element: <Users />
                    },
                    {
                        path: "camera",
                        element: <Camera />
                    },
                    {
                        path: "configuration",
                        element: <Configuration />
                    }
                ]
            },
            {
                path: "*",
                element: <PageNotFound />,
            }

        ]
    )


    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
export default Router
