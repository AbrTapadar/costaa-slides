import { useGSAP } from "@gsap/react";
import styles from "./Page.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "/templates/logo.svg";
import frame from "/frame.png";

gsap.registerPlugin(useGSAP);

const Page = (props) => {
  const [info, setinfo] = useState(props.info[props.index]);
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
    animation();
    setTimeout(() => {
      setinfo(props.info[props.index]);
    }, 1000);
  }, [props.index]);

  return (
    <div className={styles.container}>
      <div className={styles.overlay} ref={container} />
      <div className={styles.content}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.content2}>
          <div className={styles.frame}>
            <img src={info.img} alt="CoStAA" className={styles.pic} />
            <img src={frame} alt="" className={styles.frameimg} />
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
