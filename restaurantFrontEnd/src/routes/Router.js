import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const ItemsinRecipe = lazy(() => import("../views/ui/ItemsinRecipe.js"));
const AddRecipe = lazy(() => import("../views/ui/AddRecipe.js"));


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/recipeItems", exact: true, element: <ItemsinRecipe /> },
      { path: "/addrecipe", exact: true, element: <AddRecipe /> },
    ],
  },
];

export default ThemeRoutes;
