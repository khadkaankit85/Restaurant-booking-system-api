import "../pages/mycss.css";

const Navigation = () => {
  return (
    <div className="landingpagediv">
      <div className="insideLanding">
        <nav className="nav">
          <img
            width={40}
            height={40}
            src="logo.jpg"
            alt="Hamro Restaurant Logo"
            className="w-20 h-20 ml-3 "
          />{" "}
          {/* <h1 className="resturantName ml-3 text-cyan-800 hover:text-cyan-600 text-2xl font-serif font-bold">
            Hamro Resturant
          </h1> */}
          <ul className="flex space-x-4 m-3">
            <li className="li relative group">
              <span className="flex items-center cursor-pointer">Menue</span>

              <ul className="absolute hidden group-hover:block bg-white shadow-md rounded mt-1">
                <li className="li px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Lunch
                </li>
                <li className="li px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Breakfast
                </li>
                <li className="li px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Dinner
                </li>
              </ul>
            </li>
            <li className="li">Login</li>
            <li className="li">Online Order</li>
            <li className="li">Reservation</li>
            <li className="li">Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
