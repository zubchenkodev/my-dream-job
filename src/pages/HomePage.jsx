import { Fragment, useEffect, useRef, useState } from "react"

const HomePage = () => {

  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = "hidden";
    }
  }, [scrollEnabled]);

  const downRef = useRef(null);
  const upRef = useRef(null);

  const handleScrollToDown = (event) => {
    event.preventDefault();
    setScrollEnabled(true);
    downRef.current.scrollIntoView({ behavior: "smooth" });
    console.log('test')
  };

  const handleScrollToUp = (event) => {
    event.preventDefault();
    setScrollEnabled(true);
    upRef.current.scrollIntoView({ behavior: "smooth" });
    console.log('test')
  };


  return (
    <Fragment>
      <div className='overflow-x-hidden w-screen h-screen relative' ref={upRef}>
        <img src="./assets/images/main.jpg" alt="Logo" className="w-full h-full absolute z-0" />
        <div className="w-full h-full flex glass">
        <div className='w-[350px] md:w-[500px] lg:w-[800px] mx-auto flex flex-col items-center justify-center h-full text-center gap-8 relative '>
              <img src="./assets/icons/logo-icon.svg" alt="Logo" className="w-[500px] mb-4" />
              <button className="btn" onClick={handleScrollToDown}>down</button>
            </div>
        </div>
      </div>
      <div id="down" className='overflow-x-hidden w-screen h-screen' ref={downRef}>
        <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>down</h1>
        <button className="btn" onClick={handleScrollToUp}>up</button>
        </div>
      </div>
    </Fragment>
  )
}

export default HomePage