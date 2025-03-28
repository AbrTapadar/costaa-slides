import { useGSAP } from "@gsap/react";
import styles from "./Page.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "/templates/logo.png";
import frame from "/frame.png";

gsap.registerPlugin(useGSAP);

const Page = (props) => {
  const [index, setIndex] = useState("0");
  const [info, setinfo] = useState(props.info[index]);
  const [checker, setchecker] = useState("0");
  const container = useRef();

  const { contextSafe } = useGSAP({
    scope: container,
  });

  const timelineRef = useRef(
    gsap.timeline({
      defaults: { duration: 1 },
    })
  );
  const tl = timelineRef.current;

  const animation = contextSafe(() => {
    tl.to(container.current, {
      y: 0,
      ease: "bounce.out",
    }).to(container.current, {
      y: "-100vh",
    });
  });

  useEffect(() => {
    if (checker != index && !tl.isActive()) {
      setchecker(index);
      animation();
      setTimeout(() => {
        setinfo(props.info[index]);
      }, 500);
    }
  }, [index]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (props.info[key] && !tl.isActive()) {
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
      <div className={styles.overlay} ref={container} />
      <div className={styles.content}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.content2}>
          <div className={styles.frame}>
            <img src={info.img} alt="CoStAA" className={styles.pic} />
            <img src={frame} alt="frame" className={styles.frameimg} />
          </div>
          <div className={styles.textBox}>
            <h1>{info.name}</h1>
            <h3>{info.department}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
