import { useState } from "react";
import InputDate from "../InputDate/InputDate";

const AddAgenda = () => {
  const [form, setForm] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });
  return (
    <>
      <div style={{ padding: 24 }}>
        <form>
          <div style={{ display: "flex" }}>
            <div style={{ minWidth: 80 }}>Title:</div>
            <div style={{ width: "100%" }}>
              <input type="text" style={{ width: "100%" }} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ minWidth: 80 }}>Type:</div>
            <div style={{ width: "100%" }}>
              <select style={{ width: "100%" }}>
                <option hidden>-</option>
                <option value="once">Once</option>
                <option value="every-day">Every Day</option>
                <option value="every-week">Every Week</option>
                <option value="every-month">Every Month</option>
                <option value="every-year">Every Year</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ minWidth: 80 }}>Duration:</div>
            <div style={{ display: "flex", width: "auto" }}>
              <InputDate
                onChange={(value) => setForm({ ...form, startDate: value })}
                value={form.startDate}
              />
            </div>
            <div style={{ display: "flex", width: "auto" }}>
              <InputDate
                onChange={(value) => setForm({ ...form, endDate: value })}
                value={form.endDate}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ minWidth: 80 }}>Description:</div>
            <div style={{ width: "100%" }}>
              <textarea style={{ width: "100%" }}></textarea>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAgenda;
