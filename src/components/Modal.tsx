import Box from "./Box";
import BoxButton from "./BoxButton";
import { ReactNode } from "react"
import { X } from "lucide-react";

const Modal = (props: Record<string, any> & {
  children: ReactNode,
  onClose?: () => any
}) => {
  return (
    <div className="backdrop-blur-sm backdrop-brightness-40 w-screen h-screen p-2 absolute top-0 left-0 flex items-center justify-center">
      <Box className={"p-2 rounded-2xl w-30 relative " + props.className} style={{
        boxShadow: "0 0.5rem 2rem #000000bb",
        ...props.style
      }}>
        {props.onClose && <BoxButton className="absolute top-1 right-1 backdrop-blur-sm" onClick={props.onClose}><X /></BoxButton>}
        {props.children}
      </Box>
    </div>
  );
};

export default Modal;
