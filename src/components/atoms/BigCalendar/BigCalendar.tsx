import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { navigate } from "src/redux/slice/route.slice";

const monthFullName = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BigCalendar = () => {
  const dt = new Date();
  const [month, setMonth] = useState(dt.getMonth());
  const [year, setYear] = useState(dt.getFullYear());
  const [dates, setDates] = useState<any>([]);
  const [oneTime, setOneTime] = useState(true);
  const dispatch = useDispatch();

  const onChangeMonth = (value: number) => {
    if (month + value > 11) {
      setMonth(0);
      setYear(year + 1);
    } else if (month + value < 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month + value);
    }

    setOneTime(true);
  };

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);

      const dtcurrent = new Date(
        `${year}-${String(month + 1).padStart(2, "0")}-01 00:00:00`,
      );
      const lastDt = new Date(
        dtcurrent.getFullYear(),
        dtcurrent.getMonth() + 1,
        0,
      );

      let theDates: any = [];
      let weekdt: any = [];
      for (let i = 1; i <= lastDt.getDate(); i++) {
        if (i === 1) {
          let dtTime =
            dtcurrent.getTime() - dtcurrent.getDay() * 24 * 60 * 60 * 1000;
          for (let j = 0; j <= dtcurrent.getDay(); j++) {
            const curdt = new Date(dtTime + j * 24 * 60 * 60 * 1000);
            weekdt = [
              ...weekdt,
              {
                date: curdt.getDate(),
                month: curdt.getMonth(),
                year: curdt.getFullYear(),
              },
            ];
          }
        } else {
          if (weekdt.length === 7) {
            theDates = [...theDates, weekdt];
            weekdt = [];
          }
          if (weekdt.length < 7) {
            const curdt = new Date(
              `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")} 00:00:00`,
            );
            weekdt = [
              ...weekdt,
              {
                date: curdt.getDate(),
                month: curdt.getMonth(),
                year: curdt.getFullYear(),
              },
            ];
            if (i === lastDt.getDate()) {
              for (let k = 1; k <= 7 - (curdt.getDay() + 1); k++) {
                const curdtBeyond = new Date(
                  curdt.getTime() + k * 24 * 60 * 60 * 1000,
                );
                weekdt = [
                  ...weekdt,
                  {
                    date: curdtBeyond.getDate(),
                    month: curdtBeyond.getMonth(),
                    year: curdtBeyond.getFullYear(),
                  },
                ];
              }
              theDates = [...theDates, weekdt];
              weekdt = [];
            }
          }
        }
      }

      setDates(theDates);
    }
  }, [oneTime, year, month]);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => onChangeMonth(-1)}
          >
            &lt;
          </button>
          <div style={{ minWidth: 120, textAlign: "center" }}>
            {monthFullName[month]} {year}
          </div>
          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => onChangeMonth(1)}
          >
            &gt;
          </button>
        </div>
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMonth(dt.getMonth());
              setYear(dt.getFullYear());
              setOneTime(true);
            }}
          >
            {dt.getDate()}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              color: "red",
            }}
          >
            S
          </div>
          <div style={{ minWidth: 70, display: "flex", alignItems: "center" }}>
            M
          </div>
          <div style={{ minWidth: 70, display: "flex", alignItems: "center" }}>
            T
          </div>
          <div style={{ minWidth: 70, display: "flex", alignItems: "center" }}>
            W
          </div>
          <div style={{ minWidth: 70, display: "flex", alignItems: "center" }}>
            T
          </div>
          <div style={{ minWidth: 70, display: "flex", alignItems: "center" }}>
            F
          </div>
          <div style={{ minWidth: 70, display: "flex", alignItems: "center" }}>
            S
          </div>
        </div>
        {dates.map((item: any, key: React.Key | null | undefined) => (
          <div key={key} style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {(item ?? []).map(
              (sub: any, subkey: React.Key | null | undefined) => (
                <div
                  key={subkey}
                  style={{
                    flex: 1,
                    height: 70,
                    border: "solid 1px #000",
                    cursor: "pointer",
                    opacity: sub.month===month?"100%":"20%"
                  }}
                  onClick={() =>
                    sub.month===month?dispatch(
                      navigate(
                        `/week?date=${sub.year}-${String(sub.month + 1).padStart(2, "0")}-${String(sub.date).padStart(2, "0")}`,
                      ),
                    ):(new Date(`${year}-${String(month + 1).padStart(2, "0")}-01`)).getTime() > (new Date(`${sub.year}-${String(sub.month + 1).padStart(2, "0")}-01`)).getTime()?onChangeMonth(-1):onChangeMonth(1)
                  }
                >
                  <div
                    style={
                      sub.date === dt.getDate() &&
                      sub.month === dt.getMonth() &&
                      sub.year === dt.getFullYear()
                        ? {
                            background: "green",
                            width: "fit-content",
                            color: "white",
                            borderRadius: "50%",
                          }
                        : subkey === 0
                          ? {
                              color: "red",
                            }
                          : {}
                    }
                  >
                    {sub.date}
                  </div>
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BigCalendar;
