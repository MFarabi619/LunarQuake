export default function Menu() {
  return (
    <div className="absolute top-[22.5rem] w-full max-w-screen-2xl box-border flex justify-start pointer-events-none">
      <div className="grid grid-cols-5 gap-4 p-4 border border-slate-300 backdrop-blur-md border-opacity-20 rounded-lg max-w-sm shadow-xl pointer-events-auto">
        <div className="col-span-4">
          World Axes (<span className="font-bold text-orange-500">X</span>,{" "}
          <span className="font-bold text-green-500">Y</span>,{" "}
          <span className="font-bold text-blue-500">Z</span>)
        </div>
        <input
          type="checkbox"
          className="col-span-1 toggle toggle-warning"
        ></input>

        <div className="col-span-4">Latitude & Longitude</div>
        <input
          type="checkbox"
          className="col-span-1 toggle toggle-warning"
        ></input>

        <div className="col-span-4">Height Map</div>
        <input
          type="checkbox"
          className="col-span-1 toggle toggle-warning"
        ></input>

        <div className="col-span-4">Apollo Landings</div>
        <input
          type="checkbox"
          className="col-span-1 toggle toggle-warning"
        ></input>


        <div className="col-span-4">Seas & Oceans</div>
        <input
          type="checkbox"
          className="col-span-1 toggle toggle-warning"
        ></input>

        <div className="col-span-4">Directional Light Intensity
<input type="range" min={0} max={100} className="range range-warning range-xs mt-2" />
        </div>
        <button
          className="col-span-1 btn btn-sm btn-outline btn-accent self-center"
        >Reset</button>

        <div className="col-span-4">Ambient Light Intensity
        <input type="range" min={0} max={100} className="range range-warning range-xs mt-2" />
        </div>
        <button
          className="col-span-1 btn btn-sm btn-outline btn-accent self-center"
        >Reset</button>
      </div>
    </div>
  );
}
