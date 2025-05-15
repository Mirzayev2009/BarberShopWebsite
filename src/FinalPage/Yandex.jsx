import { useEffect } from "react";
import { DatabaseContext } from "@/DataBase";
import { useContext } from "react";

const YandexMap = () => {
  const { selectedBarber } = useContext(DatabaseContext);

  useEffect(() => {
    if (window.ymaps && selectedBarber?.location) {
      // Clean up previous map if exists
   const mapElement = document.getElementById('map-container');
     if (mapElement) {
      mapElement.innerHTML = 'Some content';
      } else {
          console.error('Map element not found.');
     }

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map("yandex-map", {
          center: selectedBarber.location, // Barber's location
          zoom: 14, // Zoom level (adjust as needed)
        });

        const placemark = new window.ymaps.Placemark(selectedBarber.location, {
          hintContent: selectedBarber.name,
          balloonContent: `${selectedBarber.name}<br />${selectedBarber.contact}`,
        });

        map.geoObjects.add(placemark);
      });
    }

    // Cleanup function to remove the map if the component unmounts
    return () => {
      const mapElement = document.getElementById("yandex-map");
      mapElement.innerHTML = ""; // Clear map content on unmount
    };
  }, [selectedBarber]); // Re-run when selectedBarber changes

  return <div id="yandex-map" style={{ width: "100%", height: "400px" }} />;
};

export default YandexMap;
