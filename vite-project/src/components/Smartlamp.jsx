import React, { useState } from "react";
class OffStateLamp {
  toggle(lamp) {
    lamp.setState(lamp.lowBrightnessState); 
  }
  increaseBrightness() {
    console.log("Лампа выключена.");
  }
  decreaseBrightness() {
    console.log("Лампа выключена.");
  }
}

class LowBrightnessState {
  toggle(lamp) {
    lamp.setState(lamp.offState);
  }
  increaseBrightness() {
    console.log("Яркость увеличена.");
    lamp.setState(lamp.mediumBrightnessState); 
  }
  decreaseBrightness() {
    console.log("Яркость не может быть уменьшена.");
  }
}

class MediumBrightnessState {
  toggle(lamp) {
    lamp.setState(lamp.offState); 
  }
  increaseBrightness() {
    console.log("Яркость увеличена.");
    lamp.setState(lamp.highBrightnessState); 
  }
  decreaseBrightness() {
    console.log("Яркость уменьшена.");
    lamp.setState(lamp.lowBrightnessState); 
  }
}

class HighBrightnessState {
  toggle(lamp) {
    lamp.setState(lamp.offState); 
  }
  increaseBrightness() {
    console.log("Лампа уже на максимальной яркости.");
  }
  decreaseBrightness() {
    console.log("Яркость уменьшена.");
    lamp.setState(lamp.mediumBrightnessState);
  }
}

// Компонент визуализации лампочки
const SmartLampVisualization = ({ brightnessLevel }) => {
  const getLampStyle = () => {
    switch (brightnessLevel) {
      case "low":
        return {
          backgroundColor: "#f0e68c", 
          width: "80px",
          height: "120px",
        };
      case "medium":
        return {
          backgroundColor: "#ffeb3b", 
          width: "80px",
          height: "120px",
        };
      case "high":
        return {
          backgroundColor: "#ff9800",
          width: "80px",
          height: "120px",
        };
      case "off":
      default:
        return {
          backgroundColor: "#ccc", 
          width: "80px",
          height: "120px",
        };
    }
  };

  return (
    <div
      style={{
        ...getLampStyle(),
        borderRadius: "50% 50% 20% 20%", 
        position: "relative",
        transition: "all 0.5s ease", 
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "20px",
          height: "30px",
          backgroundColor: "#333", 
          borderRadius: "10px 10px 0 0",
        }}
      ></div>
    </div>
  );
};

// Главный компонент для управления лампой
const SmartLamp = () => {
  const [state, setState] = useState("off");
  const [brightnessLevel, setBrightnessLevel] = useState("off");

  const offState = new OffStateLamp();
  const lowBrightnessState = new LowBrightnessState();
  const mediumBrightnessState = new MediumBrightnessState();
  const highBrightnessState = new HighBrightnessState();

  const setStateLamp = (newState) => {
    if (newState === "off") {
      offState.toggle({ setState: setStateLamp });
    } else if (newState === "low") {
      lowBrightnessState.toggle({ setState: setStateLamp });
    } else if (newState === "medium") {
      mediumBrightnessState.toggle({ setState: setStateLamp });
    } else if (newState === "high") {
      highBrightnessState.toggle({ setState: setStateLamp });
    }
  };

  const toggleLamp = () => {
    if (state === "off") {
      setState("low");
      setBrightnessLevel("low");
    } else if (state === "low") {
      setState("medium");
      setBrightnessLevel("medium");
    } else if (state === "medium") {
      setState("high");
      setBrightnessLevel("high");
    } else if (state === "high") {
      setState("off");
      setBrightnessLevel("off");
    }
  };

  const increaseBrightness = () => {
    if (state === "low") {
      setState("medium");
      setBrightnessLevel("medium");
    } else if (state === "medium") {
      setState("high");
      setBrightnessLevel("high");
    }
  };

  const decreaseBrightness = () => {
    if (state === "high") {
      setState("medium");
      setBrightnessLevel("medium");
    } else if (state === "medium") {
      setState("low");
      setBrightnessLevel("low");
    }
  };

  return (
    <div>
      <h2>Умная лампа</h2>
      <p>Текущее состояние: {state}</p>
      <div>
        <button onClick={toggleLamp}>
          {state === "off" ? "Включить" : "Выключить"}
        </button>
        <button onClick={increaseBrightness}>Увеличить яркость</button>
        <button onClick={decreaseBrightness}>Уменьшить яркость</button>
      </div>
      <SmartLampVisualization brightnessLevel={brightnessLevel} />
    </div>
  );
};

export default SmartLamp;
