import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../components/card/DataCard";
import { useNavigate } from "react-router-dom";
import RequestedPropertyCard from "../../components/card/RequestedPropertyCard";

export default function UserDashboard() {
  const email = localStorage.getItem("email");
  const [user, setUser] = useState({});
  const [property, setProperty] = useState([]);
  const [RequestedProperty, setRequestedProperty] = useState([]);
  const [randomFourProperties, setRandomfourProperties] = useState([]);
  const navigate = useNavigate();

  const getRandomItems = (arr, num) => {
    const shuffled = [...arr]?.sort(() => 0.5 - Math.random());
    setRandomfourProperties(shuffled.slice(0, num));
    return shuffled.slice(0, num);
  };

  const getRequestedProperties = async () => {
    const RequestedProperties = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-requested-properties/${email}`
    );
    if (RequestedProperties) {
      setRequestedProperty(RequestedProperties.data.property);
    }
  };

  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    setUser(res.data.user);
  };

  const getPropertiesById = async () => {
    const properties = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-property/${email}`
    );
    if (properties.data.status) {
      setProperty(properties.data.property);
      getRandomItems(properties.data.property, 4);
    }
  };

  const seller = {
    reviews: [
      {
        user: "Lakhan Tailor",
        comment: "Great experience! Good Price",
        rating: 5,
        star: "★ ★ ★ ★ ☆",
      },
      {
        user: "Anil Kumar",
        comment: "Great experience! Good Price",
        rating: 4,
        star: "★ ★ ★ ★ ☆",
      },
      {
        user: "Yogesh Tailor",
        comment: "Great experience! Good Price",
        rating: 4,
        star: "★ ★ ★ ★ ☆  ",
      },
      {
        user: "Pravleen Kaur",
        comment: "Very professional!",
        rating: 4,
        star: "★ ★ ★ ★ ☆",
      },
      {
        user: "Varsha Kushwaha",
        comment: "Very professional!",
        rating: 5,
        star: "★ ★ ★ ★ ★",
      },
    ],
    facilities: [
      "Swimming Pool",
      "Gym/Fitness Centers",
      "Parking Spaces (dedicated or shared)",
      "Water Supply (24/7 or specified hours)",
      "24/7 Security (CCTV surveillance, security guards",
      "Playgrounds and Parks (children’s play areas)",
      "Shopping Complex/Stores nearby or within the complex",
      "Healthcare Facilities (clinics, pharmacy within the complex)",
      "High-Speed Internet Connectivity",
    ],
  };

  useEffect(() => {
    getSpecificUserDetails();
    getPropertiesById();
    getRequestedProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <section
        className={` bg-[url('./images/house.jpg')] bg-cover bg-center text-white py-20 text-center`}
      >
        <h1 className="drop-shadow-sm text-4xl md:text-5xl font-bold">
          Welcome, {user.firstname} {user.lastname}!
        </h1>
        <div className="min-w-full flex justify-center items-center ">
          <p className="text-justify backdrop-blur-md border border-white/40 rounded-xl p-6  drop-shadow-md italic w-11/12 md:w-3/4 mt-4 text-lg md:text-xl">
            "Thinking of selling your home? You’ve come to the right place! Our
            dedicated team is here to guide you through the selling process,
            ensuring you get the best value for your property. With our
            extensive market knowledge and personalized service, we’ll help you
            every step of the way. Let’s get started on your successful sale
            today!"
          </p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-12 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
          {property?.length > 0
            ? randomFourProperties.map((data, index) => {
                return <DataCard key={index} data={data} />;
              })
            : "No property found ,create first"}
        </div>
      </section>

      <div className="flex justify-center mb-4">
        <button
          className={`bg-blue-700 text-white p-3 rounded-xl hover:bg-blue-500 transition-all cursor-pointer`}
          onClick={() => {
            navigate("/seller-dashboard/my-property");
          }}
        >
          View all properties
        </button>
      </div>

      {/* Wishlisted Properties Section */}
      <section className="py-12 px-6 bg-gray-200">
        <h2 className="text-3xl font-semibold mb-6">Requested Properties</h2>
        <div className="container mx-auto p-4">
          <div className="space-y-4">
            {RequestedProperty.map((property, index) => (
              <RequestedPropertyCard
                key={property.title}
                property={property}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold mb-6">Facilities Provided</h2>
        <ul className="list-disc pl-6">
          {seller.facilities.map((facility, index) => (
            <li key={index} className="text-gray-600 mb-2">
              {facility}
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews Section */}
      <section className="py-12 px-6 bg-gray-200">
        <h2 className="text-3xl font-semibold mb-6">User Reviews</h2>
        <div className="space-y-4">
          {seller.reviews.map((review, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <h4 className="text-xl font-semibold">{review.user}</h4>
              <p className="text-gray-600">Rating: {review.rating} / 5</p>
              <p className="text-gray-600 mt-2">"{review.comment}"</p>
              <p className="text-yellow-600 mt-2">"{review.star}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
