import TimeOffForm from "../components/timeOffForm";
import TimeOffsDisplay from "../components/timeOffsDisplay";
import OverlapAvailDetails from "../components/overlapAvailDetails";
import { useTimeOffContext } from "../hooks/useTimeOffsContext";
import { useState, useEffect, useMemo } from "react";

import { overlapTimes } from "../utils/overlapTimes";

const TimeSession = () => {
  const [peopleFilter, setPeopleFilter] = useState([]);
  const [timeFilter, setTimeFilter] = useState(0);
  const [peopleWhoMatchUser, setPeopleWhoMatchUser] = useState([]);
  const [user, setUser] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [showTimeOffs, setShowTimeOffs] = useState(() => {
    const stored = localStorage.getItem("showTimeOffs");
    return stored === null ? true : stored === "true";
  });

  const filter = { peopleFilter, timeFilter };

  // console.log("filters in time session", filter)

  const { timeOffs, dispatch } = useTimeOffContext();
  // console.log("timeOffs in time session", timeOffs)

  const uniqueNames = useMemo(() => {
    return [
      ...new Set(timeOffs ? timeOffs.map((timeOff) => timeOff.name) : []),
    ];
  }, [timeOffs]);

  // console.log("unique names in time session", uniqueNames)

  useEffect(() => {
    const fetchTimeOffs = async () => {
      const currentTimeSession = JSON.parse(
        localStorage.getItem("currentTimeSession"),
      );
      if (!currentTimeSession) {
        // No active session, perhaps dispatch an empty array or handle error
        dispatch({ type: "SET_TIMEOFF", payload: [] });
        return;
      }
      const response = await fetch(
        `/times?timeSession_id=${currentTimeSession._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_TIMEOFF", payload: json });
      }
    };
    fetchTimeOffs();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("showTimeOffs", showTimeOffs.toString());
  }, [showTimeOffs]);

  return (
    <div className={`home ${showFilters ? "filters-open" : ""}`}>
      <h1>
        {localStorage.getItem("currentTimeSession")
          ? JSON.parse(localStorage.getItem("currentTimeSession")).title
          : ""}
      </h1>
      <h2>
        Session Code:{" "}
        {localStorage.getItem("currentTimeSession")
          ? JSON.parse(localStorage.getItem("currentTimeSession"))._id
          : ""}
      </h2>

      <button
        className="timeoffs-toggle"
        onClick={() => setShowTimeOffs((prev) => !prev)}
        aria-expanded={showTimeOffs}
        aria-controls="timeoffs-display"
      >
        {showTimeOffs
          ? "Hide Availability"
          : "Show Full List of Availability Times"}
      </button>

      {showTimeOffs && (
        <div id="timeoffs-display">
          <TimeOffsDisplay timeOffs={timeOffs} />
        </div>
      )}

      <TimeOffForm />

      <button
        className="filters-toggle"
        onClick={() => setShowFilters((prev) => !prev)}
        aria-expanded={showFilters}
        aria-controls="filters-panel"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        id="filters-panel"
        className={`filters ${showFilters ? "open" : "closed"}`}
      >
        <br />
        <h3>Filter Panel that will adjust overlapping times display</h3>

        <div className="filter-option">
          <h4>
            People Filter: This will allow you to filter out availability
            requests by specific individuals{" "}
          </h4>
          {uniqueNames &&
            uniqueNames.sort().map((person) => (
              <>
                <input
                  key={person}
                  type="checkbox"
                  onChange={() => {
                    setPeopleFilter((prev) => {
                      if (prev.includes(person)) {
                        return prev.filter((p) => p !== person);
                      } else {
                        return [...prev, person];
                      }
                    });
                  }}
                  checked={peopleFilter.includes(person)}
                />
                {person}
                <br />
              </>
            ))}
        </div>

        <div className="filter-option">
          <label>Minimum Overlapping Availability (minutes): </label>
          <input
            type="number"
            value={timeFilter}
            onChange={(e) => setTimeFilter(parseInt(e.target.value))}
            min="0"
          />
        </div>

        {/* <h3>Users:</h3>
        {uniqueNames &&
          uniqueNames.map((person) => <span key={person}>{person}, </span>)} */}

        <div className="filter-option">
          <h3>Display individuals who match current user</h3>
          <h4>Select current user:</h4>
          {uniqueNames &&
            uniqueNames.map((person) => (
              <>
                <input
                  key={person}
                  type="radio"
                  name="user"
                  onChange={() => {
                    setUser(person);
                  }}
                  checked={user === person}
                />
                {person}
                <br />
              </>
            ))}

          <br />
          <button
            onClick={() => {
              if (!user) return;
              const userTimeOffs = timeOffs.filter(
                (timeOff) => timeOff.name === user,
              );
              setPeopleWhoMatchUser([]);
              uniqueNames.forEach((person) => {
                if (person === user) return;
                const personTimeOffs = timeOffs.filter(
                  (timeOff) => timeOff.name === person,
                );
                const timeOffCompare = [...userTimeOffs, ...personTimeOffs];
                const overlaps = overlapTimes(timeOffCompare).includes(2);
                if (overlaps) {
                  setPeopleWhoMatchUser((prev) => {
                    if (!prev.includes(person)) {
                      return [...prev, person];
                    } else {
                      return prev;
                    }
                  });
                }
              });
            }}
          >
            Find Matching Users
          </button>
          <h4>People who have overlapping availability with {user}:</h4>
          {peopleWhoMatchUser.length > 0 ? (
            peopleWhoMatchUser.map((person) => (
              <span key={person}>{person}, </span>
            ))
          ) : (
            <p>No matching users found.</p>
          )}
        </div>

        <button
          onClick={() => {
            setPeopleFilter([]);
            setTimeFilter(0);
          }}
        >
          Clear All Filters
        </button>
      </div>
      <br />
      <br />

      <OverlapAvailDetails
        timeOffs={timeOffs}
        filter={filter}
        uniqueNames={uniqueNames}
      />
      <br />
      <button
        onClick={() => {
          localStorage.removeItem("currentTimeSession");
          window.location.reload();
        }}
      >
        Leave Session
      </button>
    </div>
  );
};

export default TimeSession;
