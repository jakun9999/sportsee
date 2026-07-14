import styles from "./style.module.css";
import CurrentWeekActivityCard from "../../components/CurrentWeekActivityCard";

function Home() {
  return (
    <div>
      <h1 className="heading-1">Hello World!</h1>
      <CurrentWeekActivityCard />
    </div>
  );
}

export default Home;
