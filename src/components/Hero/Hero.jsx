import React, { useState } from "react";

const Hero = () => {
  const [tripType, setTripType] = useState("allerRetour");
  const [classType, setClassType] = useState("economique");
  const [adults, setAdults] = useState(1);
  const [teens, setTeens] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [babiesOnLap, setBabiesOnLap] = useState(0);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [results, setResults] = useState([]);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleSearch = (e) => {
    e.preventDefault();

    // Example API call (replace with your flight API)
    fetch(`https://api.example.com/search-flights?departure=${departure}&arrival=${arrival}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&teens=${teens}&children=${children}&infants=${infants}&babiesOnLap=${babiesOnLap}&classType=${classType}&tripType=${tripType}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.flights); // Assume API response contains flight list in 'data.flights'
      })
      .catch((error) => {
        console.error("Error fetching flight data:", error);
      });
  };

  return (
    <div className="relative h-full">
      <video 
        className="absolute inset-0 w-full h-full object-cover" 
        src="/path-to-your-video.mp4" 
        autoPlay 
        loop 
        muted 
      />
      <div className="relative bg-black/50 h-full flex justify-center items-center p-4">
        <div className="container grid grid-cols-1 gap-4">
          <div className="text-white">
            <p className="text-sm">Our Packages</p>
            <p className="font-bold text-3xl">Search Your Destination</p>
          </div>
          <div className="space-y-4 bg-gray-100 rounded-md p-4 relative">
            <div className="flex flex-wrap gap-4 justify-center items-center py-3">
              <div className="flex items-center bg-white rounded-full p-2">
                <select
                  name="tripType"
                  id="tripType"
                  className="bg-transparent focus:outline-none"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <option value="allerRetour">Aller-retour</option>
                  <option value="allerSimple">Aller simple</option>
                </select>
              </div>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center bg-white rounded-full p-2"
                >
                  <span>Passagers</span>
                </button>
                {dropdownVisible && (
                  <div className="absolute z-10 bg-white border rounded-md mt-2 p-4 w-64">
                    {[
                      { label: "Adultes ", count: adults, setter: setAdults },
                      { label: "Ados", count: children, setter: setChildren },
                      { label: "Enfants", count: infants, setter: setInfants },
                      { label: "Bébés sur genoux", count: babiesOnLap, setter: setBabiesOnLap }
                    ].map(({ label, count, setter }) => (
                      <div className="flex items-center justify-between py-2" key={label}>
                        <span>{label}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => decrement(setter, count)}
                            className="bg-gray-200 p-2 rounded-full"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={count}
                            readOnly
                            className="bg-transparent w-12 text-center focus:outline-none"
                          />
                          <button
                            onClick={() => increment(setter, count)}
                            className="bg-gray-200 p-2 rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center bg-white rounded-full p-2">
                <select
                  name="classType"
                  id="classType"
                  className="bg-transparent focus:outline-none"
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                >
                  <option value="economique">Économique</option>
                  <option value="premiumEconomique">Premium Économique</option>
                  <option value="affaires">Affaires</option>
                  <option value="premiere">Première</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-end justify-center py-3">
              <div className="flex items-center bg-white rounded-full p-2">
                <span className="material-icons">flight_takeoff</span>
                <input
                  type="text"
                  name="departure"
                  id="departure"
                  placeholder="De..."
                  className="w-full bg-transparent my-2 pl-2 focus:outline-none"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <span className="material-icons">compare_arrows</span>
              </div>
              <div className="flex items-center bg-white rounded-full p-2">
                <span className="material-icons">flight_land</span>
                <input
                  type="text"
                  name="arrival"
                  id="arrival"
                  placeholder="À..."
                  className="w-full bg-transparent my-2 pl-2 focus:outline-none"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                />
              </div>
              <div className="flex items-center bg-white rounded-full p-2">
                <span className="material-icons">event</span>
                <input
                  type="date"
                  name="departureDate"
                  id="departureDate"
                  className="w-full bg-transparent my-2 pl-2 focus:outline-none"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
              {tripType === "allerRetour" && (
                <div className="flex items-center bg-white rounded-full p-2">
                  <span className="material-icons">event</span>
                  <input
                    type="date"
                    name="returnDate"
                    id="returnDate"
                    className="w-full bg-transparent my-2 pl-2 focus:outline-none"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              )}
            </div>
            <button
              className="bg-blue-600 text-white hover:scale-105 px-4 py-2 rounded-full duration-200 absolute -bottom-5 left-1/2 -translate-x-1/2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Display search results */}
      <div className="container mt-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {results.map((flight, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{flight.airline}</p>
                    <p>{flight.flightNumber}</p>
                    <p>{flight.departureTime} - {flight.arrivalTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${flight.price}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No flights found.</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
