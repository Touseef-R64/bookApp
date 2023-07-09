import HomePage from "../../components/homePage";
import Navbar from "../../components/navBar";

export default function Home() {
  return (
    <main className="w-full min-h-[100vh] h-full ">
      <Navbar title={"My Library"} />
      <HomePage />
    </main>
  );
}
