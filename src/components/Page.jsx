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
  const [indexChecker, setindexChecker] = useState("0");
  const [checker, setchecker] = useState(false);
  const container1 = useRef();
  const container2 = useRef();

  const { contextSafe } = useGSAP({
    scope: [container1, container2],
  });

  const timelineRef1 = useRef(
    gsap.timeline({
      defaults: { duration: 1 },
    })
  );
  const tl1 = timelineRef1.current;
  const timelineRef2 = useRef(
    gsap.timeline({
      defaults: { duration: 1 },
    })
  );
  const tl2 = timelineRef2.current;

  const animation1 = contextSafe(() => {
    const currentY = gsap.getProperty(container1.current, "y");
    if (currentY !== 0) {
      tl1.to(container1.current, { y: 0, ease: "power4.out" });
    }
    tl1.to(container1.current, { y: "-50vh" });
  });
  const animation2 = contextSafe(() => {
    const currentY = gsap.getProperty(container2.current, "y");
    if (currentY !== 50) {
      tl2.to(container2.current, { y: "50vh", ease: "power4.out" });
    }
    tl2.to(container2.current, { y: "100vh" });
  });

  const dragDown = contextSafe(() => {
    tl1.to(container1.current, {
      y: 0,
      ease: "power4.out",
    });
  });

  const dragUp = contextSafe(() => {
    tl2.to(container2.current, {
      y: "50vh",
      ease: "power4.out",
    });
  });

  useEffect(() => {
    if (!tl1.isActive()) {
      if (index == "0") {
        dragDown();
        dragUp();
        setchecker(false);
      } else {
        animation1();
        animation2();
        if (checker) {
          setTimeout(() => {
            setindexChecker(index);
            setinfo(props.info[index]);
          }, 900);
        } else {
          setindexChecker(index);
          setinfo(props.info[index]);
          setchecker(true);
        }
      }
    }
  }, [index]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (props.info[event.key] && !tl1.isActive()) {
        setIndex(event.key);
      }
    };

    // const keysPressed = new Set();

    // const handleKeyDown = (event) => {
    //   keysPressed.add(event.key);

    //   if (keysPressed.has("z")) {
    //     if (/^[1-9]$/.test(event.key)) {
    //       console.log(event.key);
    //       setinfo(props.info[event.key]);
    //       console.log(info);
    //     }
    //     event.preventDefault();
    //   }
    // };

    // const handleKeyUp = (event) => {
    //   keysPressed.delete(event.key);
    // };

    window.addEventListener("keydown", handleKeyPress);
    // window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      // window.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.overlayUp} ref={container1} />
      <div className={styles.overlayDown} ref={container2} />
      <div className={styles.content}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.content2}>
          {indexChecker != "0" && (
            <div className={styles.frame}>
              <img src={info.img} alt="CoStAA" className={styles.pic} />
              <img src={frame} alt="frame" className={styles.frameimg} />
            </div>
          )}
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
