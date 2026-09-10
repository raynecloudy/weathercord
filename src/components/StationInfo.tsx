import { useAppSelector } from "$/store/hooks";
import Box from "./Box";

const StationInfo = () => {
  const station = useAppSelector(state => state.stations.selected);

  if (!station) return <></>;

  return (
    <Box className="w-15 absolute left-6 top-1 rounded-2xl flex flex-col gap-0.5 overflow-auto" style={{
      height: "calc(100vh - 7rem)"
    }}>
      <img className="h-6 object-cover" src={`/s/${station.id}/b`} alt={station.name} />
      <div className="p-1 pt-px">
        <div className="font-semibold text-lg truncate h-1.5">{station.name}</div>
        <sub>{station.memberCount} member{station.memberCount === 1 ? "" : "s"}</sub>
      </div>
    </Box>
  )
};

export default StationInfo;
