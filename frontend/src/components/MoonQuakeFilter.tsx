import { useState, useEffect } from "react";

// Define the structure of the MoonQuake data
type MoonQuake = {
  apolloStation: string;
  fileNumber: string;
  format: string;
  from: {
    day: string;
    hourMinute: string;
    second: string;
  };
  numberOfBlocks: string;
  tapeSequenceNumber: string;
  to: {
    day: string;
    hourMinute: string;
    second: string;
  };
  year: string;
};

// Convert day of year to date format (YYYY-MM-DD)
function dayOfYearToDate(year: string, day: string): string {
  const date = new Date(parseInt(year, 10), 0);
  date.setDate(parseInt(day, 10));
  return date.toISOString().split("T")[0];
}

// Convert hour, minute, and second to time format (HH:MM:SS)
function convertToTime(
  hourMinute: string,
  second: string,
  end: boolean
): string {
  const padToSize = (num: string, size: number) => num.padStart(size, "0");

  // Split hour and minute based on input length
  let hours, minutes;
  if (hourMinute.length === 3) {
    hours = hourMinute.substr(0, 1);
    minutes = hourMinute.substr(1, 2);
  } else {
    hours = hourMinute.substr(0, 2);
    minutes = hourMinute.substr(2, 2);
  }

  // Handle seconds with fractional values
  const actualSeconds = parseInt(second.split(".")[0], 10);
  const hasFraction = parseFloat(second) - actualSeconds > 0;
  const roundedSeconds = end && hasFraction ? actualSeconds + 1 : actualSeconds;

  return `${padToSize(hours, 2)}:${padToSize(minutes, 2)}:${padToSize(
    roundedSeconds.toString(),
    2
  )}`;
}

// Fetch moonquake data from json file
async function fetchMoonQuakes(): Promise<MoonQuake[]> {
  const response = await fetch("/moonquakes.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch moonquakes data: ${response.statusText}`);
  }
  return response.json();
}

export default function MoonQuakeFilter() {
  // State hooks for storing data and filter values
  const [data, setData] = useState<MoonQuake[]>([]);
  const [startDate, setStartDate] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  // Use effect to initialize moonquake data and set default filter values
  useEffect(() => {
    (async () => {
      try {
        const moonQuakes = await fetchMoonQuakes();
        setData(moonQuakes);

        // Set filter initial values based on the first and last quake
        if (moonQuakes.length) {
          const [firstQuake, lastQuake] = [
            moonQuakes[0],
            moonQuakes[moonQuakes.length - 1],
          ];

          setStartDate(dayOfYearToDate(firstQuake.year, firstQuake.from.day));
          setEndDate(dayOfYearToDate(lastQuake.year, lastQuake.to.day));

          setStartTime(
            convertToTime(
              firstQuake.from.hourMinute,
              firstQuake.from.second,
              false
            )
          );
          setEndTime(
            convertToTime(lastQuake.to.hourMinute, lastQuake.to.second, true)
          );
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // Handle filter button click
  const handleSubmit = () => {
    const selectedStartDate = new Date(`${startDate}T${startTime}Z`);
    const selectedEndDate = new Date(`${endDate}T${endTime}Z`);

    // Filter the data based on selected start and end date
    const filteredQuakes = data.filter((quake) => {
      const quakeStart = new Date(
        `${dayOfYearToDate(
          quake.year,
          quake.from.day
        )}T${quake.from.hourMinute.substr(0, 2)}:${quake.from.hourMinute.substr(
          2,
          2
        )}:${quake.from.second}Z`
      );
      const quakeEnd = new Date(
        `${dayOfYearToDate(
          quake.year,
          quake.to.day
        )}T${quake.to.hourMinute.substr(0, 2)}:${quake.to.hourMinute.substr(
          2,
          2
        )}:${quake.to.second}Z`
      );

      return (
        (quakeStart >= selectedStartDate && quakeStart <= selectedEndDate) ||
        (quakeEnd >= selectedStartDate && quakeEnd <= selectedEndDate) ||
        (quakeStart <= selectedStartDate && quakeEnd >= selectedEndDate)
      );
    });

    console.log(filteredQuakes);
  };

  // Render filter form and button
  return (
    <div className="absolute top-20 w-full max-w-screen-2xl box-border flex justify-start pointer-events-none">
      <div className="flex flex-col p-4 space-y-4 border border-slate-300 backdrop-blur-md border-opacity-20 rounded-lg max-w-sm shadow-xl pointer-events-auto">
        <h3 className="text-xl font-bold">Filter by Date and Time</h3>
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm">Start Date</label>
            <input
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              className="py-1 px-2 rounded-md border border-primary"
            />
          </div>
          <div>
            <label className="block text-sm">Start Time</label>
            <input
              type="time"
              step="1"
              value={startTime || ""}
              onChange={(e) => setStartTime(e.target.value)}
              className="py-1 px-2 rounded-md border border-primary"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm">End Date</label>
            <input
              type="date"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              className="py-1 px-2 rounded-md border border-primary"
            />
          </div>
          <div>
            <label className="block text-sm">End Time</label>
            <input
              type="time"
              step="1"
              value={endTime || ""}
              onChange={(e) => setEndTime(e.target.value)}
              className="py-1 px-2 rounded-md border border-primary"
            />
          </div>
        </div>
        <button
          className="btn btn-primary btn-outline mt-4 max-w-sm hover:scale-105"
          onClick={handleSubmit}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
