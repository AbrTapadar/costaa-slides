import { useGSAP } from "@gsap/react";
import styles from "./Page.module.scss";
import { startTransition, use, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import paper from "/paper.svg";
import logo from "/templates/logo.svg";

gsap.registerPlugin(useGSAP);

const Page = (props) => {
  const [indx, setindx] = useState("0");
  const container = useRef();
  const { contextSafe } = useGSAP({
    scope: container,
  });
  const timelineRef = useRef(
    gsap.timeline({
      repeat: "-1",
      repeatDelay: 0,
      defaults: { duration: 2, ease: "sine.inOut" },
    })
  );
  const tl = timelineRef.current;

  const animation = contextSafe(() => {
    tl.to(container.current, {
      rotateX: 10,
      rotateY: 10,
      x: 15,
    });
  });

  useEffect(() => {
    // animation();
    if (props.index != indx) {
      setindx(props.index);
    }
  }, [props.index]);

  return (
    <div className={styles.container}>
      <div className={styles.content} ref={container}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.content2}>
          <img src={props.info.img} alt="CoStAA" className={styles.pic} />
          <div className={styles.textBox}>
            <h1>{props.info.name}</h1>
            <h3>{props.info.department}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
