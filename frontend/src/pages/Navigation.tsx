import '../pages/mycss.css';

const Navigation = () => {
  return (
    <div className="landingpagediv">
      <div className='insideLanding'>
      <nav className="nav">
        {/* <img
          src="/image/Astronomia.jpg"
          alt="Astronomia Logo"
          className="logo"
        /> */}
        <h1 className='resturantName ml-3  text-cyan-800 hover:text-cyan-600 text-2xl font-serif font-bold'>Hamro Resturant</h1>
        <ul className="flex space-x-4 m-3">
          <li className="li">Menue</li>
          <li className="li">Login</li>
          <li className="li">Online Order</li>
          <li className="li">Reservation</li>

          
        </ul>
      </nav>
      </div>
      
    </div>
  );
};

export default Navigation;
