const Menu = () => {
  const items = [
    {
      id: 1,
      name: "MOMO",
      price: "$15",
      description: "Here we have a best momo",
    },
    {
      id: 2,
      name: "Dal Bhat Tarkari",
      price: "$22",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      name: "Pulau",
      price: "$18",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      name: "Natural Wine Pairing",
      price: "$90",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];
  return (
    <>
      <div className="describtion  h-[30rem] bg-lightGray  text-black   text-xl">
        <div className=" flex h-[5rem] ml-4">
          <div className="menueSection relative w-1/2 h-full  ">
            <h1 className="section1 rufinaB font-bold text-3xl">Our Menue</h1>
            <p className="section2">Here is our famous food .</p>
          </div>
          <div className="image  w-1/2 h-full flex justify-end items-start">
            <img
              src="imageLeaf.png"
              alt="picture of leaf"
              className="size-96  right-[10px] "
            ></img>
          </div>
        </div>
        <div className="max-w-5xl ml-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border-b border-dotted border-gray-400 pb-4 mt-20 flex items-start"
            >
              <div className="flex-col justify-between w-full items-center">
                <h3 className="text-lg font-bold">{item.name}</h3>

                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
              <span className="text-lg font-bold  items-center">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between h-3/5 bg-olive ">
        <div className="h-full">
          <img
            src="manworking.jpg"
            alt="Decorative leaf"
            className="h-full w-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="mt-8 lg:mt-0 lg:ml-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-800">Excellent Cook</h1>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem
            id penatibus blandit at purus auctor tincidunt lacus.
          </p>
          <div className="secondLeaf">
            <img
              src="Leaf2.png"
              alt="second leaf"
              className="absolute right-20 h-40 w-60"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
