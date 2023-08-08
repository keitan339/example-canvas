import { Route, RouteProps, Routes } from "react-router-dom";
import { ReactKonvaPage } from "../features/reat-konva/components/pages/ReactKonvaPage";

export const PageRoutes = () => {
  return (
    <Routes>
      {routeList.map(({ path, ...rest }) => {
        return <Route key={path} path={path} {...rest} />;
      })}
    </Routes>
  );
};

const routeList: RouteProps[] = [
  {
    path: "/",
    element: <ReactKonvaPage />,
  },
];
