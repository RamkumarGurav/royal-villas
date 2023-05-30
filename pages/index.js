import dynamic from "next/dynamic";
import Homepage from "../clientPages/Homepage";

export default dynamic(() => Promise.resolve(Homepage), { ssr: false });
