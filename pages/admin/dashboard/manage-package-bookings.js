import dynamic from "next/dynamic";
import DashboardBookings from "../../../clientPages/DashboardBookings";

export default dynamic(() => Promise.resolve(DashboardBookings), {
  ssr: false,
});
