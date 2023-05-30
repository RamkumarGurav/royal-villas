import dynamic from "next/dynamic";
import Dashboard from "../../../clientPages/Dashboard";

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
