import axios from "axios";
import React, { useEffect, useState } from "react";

const Xstate = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [selectedCounty, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [selectedCity, setSelectedCity] = useState("");

  const getContriesNames = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      setCountriesData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getStatesNames = async (country) => {
    console.log(country);
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      setStatesData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getCitiesNames = async (stateName) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCounty}/state=${stateName}/cities`
      );
      setCitiesData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getContriesNames();
    // getCitiesNames();
  }, []);
  return (
    <div>
      <select
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          getStatesNames(e.target.value);
        }}
        name="Select Country"
      >
        <option value="">Select Country</option>
        {countriesData.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => {
          setSelectedState(e.target.value);
          getCitiesNames(e.target.value);
        }}
        name="Select State"
      >
        <option value="">Select State</option>
        {statesData.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => {
          // setSelectedCountry(e.target.value);
          setSelectedCity(e.target.value);
          // getCitiesNames(e.target.value);
        }}
        name="Select State"
      >
        <option value="">Select City</option>
        {citiesData.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div>
        {selectedCity && selectedCity && selectedState ? (
          <>
            {" "}
            You selected {selectedCity}, {selectedState}, {selectedCounty}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Xstate;
