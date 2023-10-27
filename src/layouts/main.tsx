import { Outlet, useLoaderData } from "react-router-dom";
import wave from "../assets/wave.svg";
import { Nav } from "../components/nav";
import { fetchData } from "../helpers";

interface MainProps {}

// Define the data type returned by mainLoader
interface MainLoaderData {
  userName: string;
}

// loader
async function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main: React.FC<MainProps> = () => {
  const { userName } = useLoaderData() as MainLoaderData;

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export { Main, mainLoader };
