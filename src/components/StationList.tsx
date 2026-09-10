import Box from "./Box";
import { ModalType } from "@/lib/modals";
import { openModal } from "@/lib/store/reducers/modals";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedStation } from "@/lib/store/reducers/stations";

const abbreviatedName = (name: string) => name.replace(/[^a-zA-Z0-9& ]/g, "").match(/((\b|^)[a-zA-Z0-9&])/g)?.join("");

const StationList = () => {
  const dispatch = useAppDispatch();
  const stations = useAppSelector((state) => state.stations.stations);

  return (
    <Box className="w-4 p-0.5 absolute left-1 top-1 rounded-2xl flex flex-col gap-0.5 overflow-auto" style={{
      height: "calc(100vh - 7rem)"
    }}>
      <div className="flex flex-col gap-0.5 grow">
        {stations.map((station, i) => {
          return (
            <button key={i} className="w-3 h-3 rounded-xl cursor-pointer bg-(--outline)" onClick={() => dispatch(setSelectedStation(station.id))}>{abbreviatedName(station.name)}</button>
          );
        })}
      </div>
      <button className="w-3 h-2 shrink-0 rounded-xl cursor-pointer bg-(--accent-background)" onClick={() => dispatch(openModal(ModalType.CreateStation))}><Plus className="text-(--accent)" /></button>
    </Box>
  );
};

export default StationList;
