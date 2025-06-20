import { useEffect, useContext } from "react";
import { DatabaseContext } from "@/DataBase";

const YandexMap = () => {
  const { selectedBarber } = useContext(DatabaseContext);

  useEffect(() => {
    if (window.ymaps && selectedBarber?.location) {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map("yandex-map", {
          center: selectedBarber.location,
          zoom: 14,
        });

        const placemark = new window.ymaps.Placemark(selectedBarber.location, {
          hintContent: selectedBarber.name,
          balloonContent: `${selectedBarber.name}<br />${selectedBarber.contact}`,
        });

        map.geoObjects.add(placemark);
      });
    }

    return () => {
      const mapElement = document.getElementById("yandex-map");
      if (mapElement) mapElement.innerHTML = "";
    };
  }, [selectedBarber]);

  return <div id="yandex-map" style={{ width: "100%", height: "400px" }} />;
};

export default YandexMap;
