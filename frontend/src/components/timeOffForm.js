import { useState } from "react";
import { useTimeOffContext } from "../hooks/useTimeOffsContext";
import { timeToMin } from "../utils/timeConvert";
import apiClient from "../utils/apiClient";

const TimeOffForm = ({ currentUsersNames }) => {
  const users = currentUsersNames || [];
  const { dispatch } = useTimeOffContext();
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [useEveryday, setUseEveryday] = useState(false);
  const [timeStart, setTimeStart] = useState("00:00");
  const [timeEnd, setTimeEnd] = useState("00:01");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomName, setShowCustomName] = useState(false);
  const [customName, setCustomName] = useState("");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTimeSession = JSON.parse(
      localStorage.getItem("currentTimeSession"),
    );
    if (!currentTimeSession) {
      setError(
        "No active time session. Please create or join a time session first.",
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    // Check if at least one day is selected
    const daysToSubmit = useEveryday ? daysOfWeek : selectedDays;
    if (daysToSubmit.length === 0) {
      setError("Please select at least one day.");
      setIsLoading(false);
      return;
    }

    // converting time to integers for backend
    const startMin = timeToMin(timeStart);
    const endMin = timeToMin(timeEnd);

    // Submit for each selected day
    for (let i = 0; i < daysToSubmit.length; i++) {
      const day = daysToSubmit[i];
      const time = {
        name: name,
        day: day,
        timeStart: startMin,
        timeEnd: endMin,
        sessionCode: currentTimeSession.sessionCode,
      };

      let json;
      try {
        json = await apiClient("/times", {
          method: "POST",
          body: time,
          requireAuth: true,
        });
      } catch (err) {
        setError(err.message || "Failed to add time off");
        setIsLoading(false);
        return;
      }
      if (i === daysToSubmit.length - 1) {
        // only reset form and dispatch after last request
        setName("");
        setCustomName("");
        setShowCustomName(false);
        setSelectedDays([]);
        setUseEveryday(false);
        setTimeStart("00:00");
        setTimeEnd("00:01");
        setError(null);
        dispatch({ type: "CREATE_TIMEOFF", payload: json });
        setIsLoading(false);
      } else {
        dispatch({ type: "CREATE_TIMEOFF", payload: json });
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add a new availability time </h3>

      <label htmlFor="nameSelect">Name: </label>
      <select
        id="nameSelect"
        onChange={(e) => {
          if (e.target.value === "New Name") {
            setShowCustomName(true);
            setName("");
          } else {
            setShowCustomName(false);
            setName(e.target.value);
            setCustomName("");
          }
        }}
        value={showCustomName ? "New Name" : name}
        required={!showCustomName}
      >
        <option value=""></option>
        {users &&
          users.map((userName) => (
            <option key={userName} value={userName}>
              {userName}
            </option>
          ))}
        <option value="New Name">New Name</option>
      </select>
      {showCustomName && (
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => {
            setCustomName(e.target.value);
            setName(e.target.value);
          }}
          value={customName}
          required
        />
      )}

      <label htmlFor="weekdays">Select which days of the week: </label>
      <div className="weekdays-checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={useEveryday}
            onChange={(e) => {
              setUseEveryday(e.target.checked);
              if (e.target.checked) {
                setSelectedDays([]);
              }
            }}
          />
          Everyday
        </label>
        <br />

        {!useEveryday && (
          <fieldset>
            {daysOfWeek.map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDays((prev) => [...prev, day]);
                    } else {
                      setSelectedDays((prev) => prev.filter((d) => d !== day));
                    }
                  }}
                />
                {day}
              </label>
            ))}
          </fieldset>
        )}
      </div>

      <label>Start Time: </label>
      <input
        type="time"
        step="60"
        onChange={(e) => setTimeStart(e.target.value)}
        value={timeStart}
        required
      />

      <label>End Time: </label>
      <input
        type="time"
        step="60"
        onChange={(e) => setTimeEnd(e.target.value)}
        value={timeEnd}
        required
      />

      <button disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Time"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TimeOffForm;
