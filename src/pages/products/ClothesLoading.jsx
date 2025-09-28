import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faShirt,
  faSocks,
  faHatCowboy,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";

const ClothesLoading = ({ duration = 2000, interval = 200, onFinish }) => {
  const icons = [faTshirt, faShirt, faSocks, faHatCowboy, faShoePrints];
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, interval);

    const timeout = setTimeout(() => {
      clearInterval(id);
      if (onFinish) onFinish();
    }, duration);

    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, [interval, duration, icons.length, onFinish]);

  return (
    <div
      style={{
        fontSize: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
      }}
    >
      <FontAwesomeIcon icon={icons[currentIcon]} />
    </div>
  );
};

export default ClothesLoading;
