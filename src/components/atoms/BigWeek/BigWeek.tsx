import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { extractQueryUrl } from "src/helpers/helper";
import { RootState } from "src/redux";
import { setOpenAddModalAgenda } from "src/redux/slice/agenda.slice";
import { navigate } from "src/redux/slice/route.slice";

const BigWeek = () => {
  const tdy = new Date();
  const today = new Date(
    `${tdy.getFullYear()}-${String(tdy.getMonth() + 1).padStart(2, "0")}-${String(tdy.getDate()).padStart(2, "0")} 00:00:00`,
  );
  const dispatch = useDispatch();
  const path = useSelector((state: RootState) => state.route.path);
  const [oneTime, setOneTime] = useState(true);
  const [query, setQuery] = useState<any>(null);
  const [dts, setDts] = useState<string[]>([]);
  const [tis, setTis] = useState<number>(0);

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);
      const url = path.split("?");
      if (!!url[1]) {
        const qry = extractQueryUrl(url[1]) as { date: string };
        setQuery(qry);
        const dtcurrent = new Date(`${qry?.date ?? ""} 00:00:00`);
        const day = dtcurrent.getDay();
        const ftime = dtcurrent.getTime() - day * 24 * 60 * 60 * 1000;

        let list: string[] = [];

        for (
          let i = ftime;
          i < ftime + 7 * 24 * 60 * 60 * 1000;
          i += 24 * 60 * 60 * 1000
        ) {
          const dtcur = new Date(i);
          list = [
            ...list,
            `${dtcur.getFullYear()}-${String(dtcur.getMonth() + 1).padStart(2, "0")}-${String(dtcur.getDate()).padStart(2, "0")}`,
          ];
        }

        setDts(list);
      }
    }
  }, [path, oneTime]);

  useEffect(() => {
    setInterval(() => {
      setTis(new Date().getTime());
    }, 1000);
  }, []);
  return (
    <>
      <div
        style={{
          width: "calc(100vw - 15px)",
          position: "fixed",
          top: 0,
          zIndex: 998,
          background: "#fff",
        }}
      >
        <div style={{ display: "flex" }}>
          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(navigate("/"))}
          >
            Calendar
          </button>
          <button
            type="button"
            style={{ cursor: "pointer", marginLeft: "auto" }}
            onClick={() => dispatch(setOpenAddModalAgenda(true))}
          >
            +
          </button>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              color: "red",
            }}
          >
            S
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            M
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            T
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            W
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            T
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            F
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            S
          </div>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          {dts.map((item, key: number) => (
            <React.Fragment key={key}>
              <div
                style={{
                  border: "1px #000 solid",
                  display: "flex",
                  flex: 1,
                  ...(key === 0 ? { color: "red" } : {}),
                }}
              >
                {Number(item.substring(0, 4)) === tdy.getFullYear() &&
                Number(item.substring(6, 7)) === tdy.getMonth() + 1 &&
                Number(item.substring(8)) === tdy.getDate() ? (
                  <div
                    style={{
                      background: "green",
                      width: "fit-content",
                      color: "white",
                      borderRadius: "50%",
                    }}
                  >
                    {Number(item.substring(8))}
                  </div>
                ) : (
                  <>{Number(item.substring(8))}</>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: 70,
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 70px)",
          paddingTop: 10,
          position: "relative",
          overflowY: "scroll",
        }}
      >
        {[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23,
        ].map((item, key) => (
          <React.Fragment key={key}>
            <div
              style={{
                borderBottom: "solid #000 1px",
                ...(key === 0
                  ? {
                      borderTop: "solid #000 1px",
                    }
                  : {}),
                minHeight: 250,
                position: "relative",
              }}
            >
              <div
                style={{
                  border: "solid #000 1px",
                  background: "#fff",
                  width: "fit-content",
                  position: "absolute",
                  top: -10,
                }}
              >
                {String(item).padStart(2, "0")}:00
              </div>
              <div
                style={{ display: "flex", width: "100%", minHeight: "100%" }}
              >
                {dts.map((item, key: number) => (
                  <React.Fragment key={key}>
                    <div
                      style={{
                        ...key===0?{borderLeft: "1px #000 solid"}:{},
                        borderRight: "1px #000 solid",
                        display: "flex",
                        flex: 1,
                        minHeight: "100%",
                      }}
                    ></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}

        {dts.findIndex(
          (item) =>
            Number(item.substring(0, 4)) === tdy.getFullYear() &&
            Number(item.substring(6, 7)) === tdy.getMonth() + 1 &&
            Number(item.substring(8)) === tdy.getDate(),
        ) > 0 ? (
          <div
            style={{
              position: "absolute",
              background: "red",
              height: 4,
              top: ((tis - today.getTime()) / 60 / 60 / 1000) * 250,
              width: 72.85,
              left:
                new Date(tis).getDay() *
                (72.85 -
                  new Date(tis).getDay()),
            }}
          ></div>
        ) : null}
      </div>
    </>
  );
};

export default BigWeek;
