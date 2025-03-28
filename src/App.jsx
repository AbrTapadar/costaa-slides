import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Page from "./components/Page";

import dvm from "/images/dvm.png";
import pep from "/images/pep.png";
import adp from "/images/adp.png";
import pcra from "/images/pcra.png";
import controls from "/images/controls.png";
import recnacc from "/images/recnacc.png";
import spons from "/images/spons.png";
import gensec from "/images/gensec.png";
import prez from "/images/prez.png";

function App() {
  const [index, setIndex] = useState("0");

  const list = {
    0: {
      name: " ",
      img: dvm,
      department: " ",
    },
    1: {
      name: "Tarun S",
      img: dvm,
      department: "Department of Visual Media",
    },
    2: {
      name: "Kashish Agrawal",
      img: pep,
      department: "Department of Paper Evaluation and Presentation",
    },
    3: {
      name: "Bhoomika Jain",
      img: adp,
      department: "Department of Art, Design and Publicity",
    },
    4: {
      name: "Harnoor Singh",
      img: pcra,
      department: "Department of Publications and Correspondence For Apogee",
    },
    5: {
      name: "Lakshay Jain",
      img: controls,
      department: "Department of Controls",
    },
    6: {
      name: "Shubham Singh",
      img: recnacc,
      department: "Department of Reception and Accommodation",
    },
    7: {
      name: "Pratham Sonawane",
      img: spons,
      department: "Department of Sponsorship and Marketing",
    },
    8: {
      name: "Aryan Khorana",
      img: gensec,
      department: "General Secretary, Students’ Union",
    },
    9: {
      name: "Ahan Bansal",
      img: prez,
      department: "President Students’ Union",
    },
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (list[key]) {
        setIndex(key);
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Page index={index} info={list} />
    </div>
  );
}

export default App;
