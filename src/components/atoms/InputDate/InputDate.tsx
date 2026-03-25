import { useEffect, useState } from "react";
import { monthFullName } from "src/constants";

const InputDate: React.FC<{
  onChange: (value: string) => void;
  value: string | null;
}> = ({ onChange, value }) => {
  const valueDt = new Date(value as string);
  const dt = !!value ? valueDt : new Date();
  const [month, setMonth] = useState(dt.getMonth());
  const [year, setYear] = useState(dt.getFullYear());
  const [dates, setDates] = useState<any>([]);
  const [oneTime, setOneTime] = useState(true);
  const [openDate, setOpenDate] = useState(false);

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
      <div style={{ display: "flex", width: "100%" }}>
        <input
          type="text"
          disabled
          style={{ display: "flex", width: "calc(100% - 25px)" }}
          value={value??""}
        />
        <button
          type="button"
          style={{ cursor: "pointer", display: "flex" }}
          onClick={() => setOpenDate(true)}
        >
          date
        </button>
      </div>

      {openDate ? (
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
          ></div>

          <div
            style={{
              background: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              height: "fit-content",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "red",
                  }}
                >
                  S
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  M
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  T
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  W
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  T
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  F
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  S
                </div>
              </div>

              {dates.map((item: any, key: React.Key | null | undefined) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  {(item ?? []).map(
                    (sub: any, subkey: React.Key | null | undefined) => (
                      <div
                        key={subkey}
                        style={{
                          flex: 1,
                          height: 30,
                          cursor: "pointer",
                          opacity: sub.month === month ? "100%" : "20%",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                        onClick={() =>
                          onChange(
                            `${sub.year}-${String(sub.month + 1).padStart(2, "0")}-${String(sub.date).padStart(2, "0")} 00:00:00`,
                          )
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

            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                width: "fit-content",
              }}
            >
              <input max={23} min={0} type="number" value={value?.split(" ")[1].split(":")[0]??""} onChange={(e)=>{
                onChange(`${value?.substring(0,10) ?? `${year}-${String(month+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,'0')}`} ${e.currentTarget.value.padStart(2,"0")}:00:00`)
              }} />:
              <input max={59} min={0} type="number" value={value?.split(" ")[1].split(":")[1]??""} onChange={(e)=>{
                onChange(`${value?.substring(0,14) ?? `${year}-${String(month+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,'0')} 00:`}${e.currentTarget.value.padStart(2,"0")}${value?.slice(-3)??":00"}`)
              }}  />
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                width: "fit-content",
              }}
            >
              <button
                type="button"
                style={{ cursor: "pointer", display: "flex" }}
                onClick={() => setOpenDate(false)}
              >
                close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InputDate;
