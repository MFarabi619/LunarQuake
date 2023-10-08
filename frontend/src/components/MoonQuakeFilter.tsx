import { useState, useEffect } from "react";

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

function dayOfYearToDate(year: string, day: string): string {
  const date = new Date(parseInt(year, 10), 0);
  date.setDate(parseInt(day, 10));
  return date.toISOString().split("T")[0];
}

function convertToTime(
  hourMinute: string,
  second: string,
  end: boolean
): string {
  const padToSize = (num: string, size: number) => num.padStart(size, "0");

  let hours, minutes;
  if (hourMinute.length === 3) {
    hours = hourMinute.substr(0, 1);
    minutes = hourMinute.substr(1, 2);
  } else {
    hours = hourMinute.substr(0, 2);
    minutes = hourMinute.substr(2, 2);
  }

  const actualSeconds = parseInt(second.split(".")[0], 10);
  const hasFraction = parseFloat(second) - actualSeconds > 0;
  const roundedSeconds = end && hasFraction ? actualSeconds + 1 : actualSeconds;

  return `${padToSize(hours, 2)}:${padToSize(minutes, 2)}:${padToSize(
    roundedSeconds.toString(),
    2
  )}`;
}

async function fetchMoonQuakes(): Promise<MoonQuake[]> {
  const response = await fetch("/moonquakes.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch moonquakes data: ${response.statusText}`);
  }
  return response.json();
}

export default function MoonQuakeFilter() {
  const [data, setData] = useState<MoonQuake[]>([]);
  const [startDate, setStartDate] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const moonQuakes = await fetchMoonQuakes();
        setData(moonQuakes);

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

  const handleSubmit = () => {
    const selectedStartDate = new Date(`${startDate}T${startTime}Z`);
    const selectedEndDate = new Date(`${endDate}T${endTime}Z`);
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

  return (
    <div className="flex flex-col p-4 space-y-4">
      <h3 className="text-xl font-bold">Filter by Date and Time</h3>
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm">Start Date</label>
          <input
            type="date"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Start Time</label>
          <input
            type="time"
            step="1"
            value={startTime || ""}
            onChange={(e) => setStartTime(e.target.value)}
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
          />
        </div>
        <div>
          <label className="block text-sm">End Time</label>
          <input
            type="time"
            step="1"
            value={endTime || ""}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-4 max-w-sm" onClick={handleSubmit}>
        Apply Filter
      </button>
    </div>
  );
}
