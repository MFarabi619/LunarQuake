import { useState, useEffect } from "react";

export interface Quake {
  lat: number;
  lng: number;
  magnitude: number;
  date: string;
  label: string;
}

export default function DataTable({ setSelectedQuake }: { setSelectedQuake: (quake: Quake) => void }) {
  const [quakeData, setQuakeData] = useState<Quake[]>([]);

  useEffect(() => {
    fetch("/quake_locations.json")
      .then((response) => response.json())
      .then((data) => setQuakeData(data));
  }, []);

  return (
    <div className="absolute top-20 w-full max-w-screen-2xl max-h-[80vh] box-border flex justify-end pointer-events-none">
      <div className="flex flex-col p-4 space-y-4 border border-slate-300 backdrop-blur-md border-opacity-20 rounded-lg max-w-sm shadow-xl pointer-events-auto">
        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>#</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Magnitude</th>
                <th>Date</th>
                {/* <th>Label</th> */}
              </tr>
            </thead>
            <tbody>
              {quakeData.map((quake, index) => (
                <tr key={index} onClick={() => setSelectedQuake(quake)}>
                  <th>{index + 1}</th>
                  <td>{quake.lat}</td>
                  <td>{quake.lng}</td>
                  <td>{quake.magnitude}</td>
                  <td>{quake.date}</td>
                  {/* <td>{quake.label}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}