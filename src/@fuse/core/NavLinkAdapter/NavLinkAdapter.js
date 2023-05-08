import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const NavLinkAdapter = forwardRef((props, ref) => (
  <NavLink
    innerRef={ref}
    {...props}
    onClickCapture={() => {
      console.log("ASDASDASDASD");
    }}
  />
));

export default NavLinkAdapter;
