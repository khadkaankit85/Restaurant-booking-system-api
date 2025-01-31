const Menu = () => {
  return (
    <>
      <div className="describtion flex h-[15rem] bg-white text-black  text-xl">
        <div className="menueSection relative w-1/2 h-full  ">
          <h1 className="section1 rufinaB font-bold text-2xl">Our Menue</h1>
          <p className="section2">Here is our famous food .</p>
        </div>
        <div className="image  w-1/2 h-full flex justify-end items-start">
          <img
            src="../../public/image/image.png"
            alt="picture of leaf"
            className="size-96  right-[10px] "
          ></img>
        </div>
      </div>
    </>
  );
};

export default Menu;
