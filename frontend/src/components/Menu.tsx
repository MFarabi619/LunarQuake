interface MenuProps {
  showWorldAxes: boolean;
  onToggleWorldAxes: () => void;
  showLatitudeLongitude: boolean;
  onToggleLatitudeLongitude: () => void;
  setDirectionalLightIntensity: (value: number) => void;
  directionalLightIntensity: number;
  setAmbientLightIntensity: (value: number) => void;
  ambientLightIntensity: number;
  setHemisphereLightIntensity: (value: number) => void;
  hemisphereLightIntensity: number;
  setPointLightIntensity: (value: number) => void;
  pointLightIntensity: number;
}

export default function Menu({
  showWorldAxes,
  onToggleWorldAxes,
  showLatitudeLongitude,
  onToggleLatitudeLongitude,
  setDirectionalLightIntensity,
  directionalLightIntensity,
  setAmbientLightIntensity,
  ambientLightIntensity,
  setHemisphereLightIntensity,
  hemisphereLightIntensity,
  setPointLightIntensity,
  pointLightIntensity,
}: MenuProps) {
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
          checked={showWorldAxes}
          onChange={onToggleWorldAxes}
          className="col-span-1 toggle toggle-warning"
        ></input>

        <div className="col-span-4">Latitude & Longitude</div>
        <input
          type="checkbox"
          className="col-span-1 toggle toggle-warning"
          checked={showLatitudeLongitude}
          onChange={onToggleLatitudeLongitude}
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

        <div className="col-span-4">Directional Light Intensity</div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={directionalLightIntensity}
          onChange={(e) => setDirectionalLightIntensity(Number(e.target.value))}
          className="col-span-4 range range-warning range-xs mt-2"
        />
        <button className="col-span-1 btn btn-sm btn-outline btn-accent self-center">
          Reset
        </button>

        <div className="col-span-4">Ambient Light Intensity</div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={ambientLightIntensity}
          onChange={(e) => setAmbientLightIntensity(Number(e.target.value))}
          className="col-span-4 range range-warning range-xs mt-2"
        />
        <button className="col-span-1 btn btn-sm btn-outline btn-accent self-center">
          Reset
        </button>

        <div className="col-span-4">Hemisphere Light Intensity</div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={hemisphereLightIntensity}
          onChange={(e) => setHemisphereLightIntensity(Number(e.target.value))}
          className="col-span-4 range range-warning range-xs mt-2"
        />
        <button className="col-span-1 btn btn-sm btn-outline btn-accent self-center">
          Reset
        </button>

        {/* <div className="col-span-4">Point Light Intensity</div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={pointLightIntensity}
          onChange={(e) => setPointLightIntensity(Number(e.target.value))}
          className="col-span-4 range range-warning range-xs mt-2"
        />
        <button className="col-span-1 btn btn-sm btn-outline btn-accent self-center">
          Reset
        </button> */}
      </div>
    </div>
  );
}
