import React, { useEffect, useState } from "react";
import BigCalendar from "./components/atoms/BigCalendar/BigCalendar";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./redux";
import { match } from "path-to-regexp";
import BigWeek from "./components/atoms/BigWeek/BigWeek";

const routes = [
  {
    path: "/",
    Component: BigCalendar
  },
  {
    path: "/week",
    Component: BigWeek
  }
]

const RouteIndex = () => {
  const currentPath = useSelector((state: RootState)=>state.route.path);

  const SelectedComponent = routes.find((item)=>match(item.path)(currentPath.split("?")[0]))?.Component ?? (()=><></>);
  return (
    <>
      <SelectedComponent />
    </>
  );
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouteIndex />
      </Provider>
    </>
  );
};

export default App;
