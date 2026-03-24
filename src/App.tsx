import React, { useEffect, useState } from "react";
import BigCalendar from "./components/atoms/BigCalendar/BigCalendar";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./redux";
import { match } from "path-to-regexp";
import BigWeek from "./components/atoms/BigWeek/BigWeek";
import { setOpenAddModalAgenda } from "./redux/slice/agenda.slice";

const routes = [
  {
    path: "/",
    Component: BigCalendar,
  },
  {
    path: "/week",
    Component: BigWeek,
  },
];

const RouteIndex = () => {
  const currentPath = useSelector((state: RootState) => state.route.path);
  const openAddModalAgenda = useSelector(
    (state: RootState) => state.agenda.openAddModalAgenda,
  );
  const dispatch: AppDispatch = useDispatch();

  const SelectedComponent =
    routes.find((item) => match(item.path)(currentPath.split("?")[0]))
      ?.Component ?? (() => <></>);
  return (
    <>
      <SelectedComponent />
      {openAddModalAgenda ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,.4)",
              width: "100%",
              height: "100%",
            }}
            onClick={() => dispatch(setOpenAddModalAgenda(false))}
          ></div>
          <div
            style={{
              background: "#fff",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              width: "100%",
              position: "fixed",
              bottom: 0,
              height: 150,
              paddingTop: 30,
            }}
          >
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>Title:</td>
                  <td>
                    <input type="text" style={{ width: "100%" }} />
                  </td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>
                    <select>
                      <option hidden>-</option>
                      <option value="once">Once</option>
                      <option value="every-week">Every Week</option>
                      <option value="every-month">Every Month</option>
                      <option value="every-year">Every Year</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Duration:</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
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
