import { useGSAP } from "@gsap/react";
import styles from "./Page.module.scss";
import { startTransition, use, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import paper from "/paper.svg";
import logo from "/templates/logo.svg";

gsap.registerPlugin(useGSAP);

const Page = (props) => {
  const [indx, setindx] = useState("0");
  const [show, setShow] = useState(false);
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

  useEffect(() => {
    const animation = contextSafe(() => {
      tl.to(container.current, {
        rotateX: 10,
        rotateY: 10,
        x: 15,
        // transformOrigin: "0% 100%",
      })
        .to(container.current, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          // transformOrigin: "0% 100%",
        })
        .to(container.current, {
          rotateX: -7,
          rotateY: -7,
          x: -15,

          // transformOrigin: "100% 0%",
        })
        .to(container.current, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          // transformOrigin: "100% 0%",
        });
    });
    animation();
  }, []);

  useEffect(() => {
    const transition = () => {
      const timeline2 = gsap.timeline({
        defaults: { duration: 2, ease: "sine.inOut" },
        onComplete: () => {
          tl.play();
          setShow(true);
        },
      });
      timeline2.to(container.current, {
        rotateY: gsap.getProperty(container.current, "rotateY") + 360,
        rotateX: gsap.getProperty(container.current, "rotateX"),
        x: gsap.getProperty(container.current, "x"),
        transformOrigin: "50% 50%",
      });
    };
    if (props.index != indx) {
      console.log(gsap.getProperty(container.current, "rotateY"));
      setShow(false);
      tl.pause();
      transition();
      setindx(props.index);
    }
  }, [props.index]);

  return (
    <div ref={container} className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.content}>
        {show && (
          <>
            <img src={props.info.img} alt="CoStAA" className={styles.pic} />
            <div className={styles.textBox}>
              <h1>{props.info.name}</h1>
              <h3>{props.info.department}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
