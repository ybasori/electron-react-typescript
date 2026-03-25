import React, { useEffect, useState } from "react";
import BigCalendar from "./components/atoms/BigCalendar/BigCalendar";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./redux";
import { match } from "path-to-regexp";
import BigWeek from "./components/atoms/BigWeek/BigWeek";
import { setOpenAddModalAgenda } from "./redux/slice/agenda.slice";
import Modal from "./components/atoms/Modal/Modal";
import AddAgenda from "./components/atoms/AddAgenda/AddAgenda";

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
        <Modal onClickBackdrop={() => dispatch(setOpenAddModalAgenda(false))} height={200}>
          <AddAgenda />
        </Modal>
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
