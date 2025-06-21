import UserProfile from "../models/userProfileModel.js";

export const saveProfile = async (req, res) => {
  try {
    const data = req.body;
    const newProfile = new UserProfile(data);
    await newProfile.save();
    res.status(201).json({ message: "Profile saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkUsernameAvailability = async (req, res) => {
  const { username } = req.query;
  const user = await UserProfile.findOne({ username });
  res.json({ available: !user });
};

export const getCountries = async (req, res) => {
  const countries = ["India", "USA", "UK"]; // mock data
  res.json(countries);
};

export const getStates = async (req, res) => {
  const { country } = req.params;
  const statesMap = {
    India: [
      "UP",
      "Delhi",
      "Maharashtra",
      "Gujarat",
      "Karnataka",
      "Rajasthan",
      "Tamil Nadu",
      "West Bengal",
      "Punjab",
      "Bihar",
    ],
    USA: ["California", "Texas", "New York", "Florida"],
    UK: ["London", "Birmingham", "Manchester"],
    Canada: ["Ontario", "Quebec", "British Columbia"],
    Australia: ["New South Wales", "Victoria", "Queensland"],
    Germany: ["Bavaria", "Berlin", "Hesse"],
    France: ["Île-de-France", "Provence", "Normandy"],
    Japan: ["Tokyo", "Osaka", "Kyoto"],
    Brazil: ["São Paulo", "Rio de Janeiro", "Bahia"],
    South_Africa: ["Gauteng", "Western Cape", "KwaZulu-Natal"],
  };
  res.json(statesMap[country] || []);
};

export const getCities = async (req, res) => {
  const { state } = req.params;
  const citiesMap = {
    UP: ["Noida", "Lucknow","Agra", "Varanasi", "Kanpur", "Ghaziabad", "Meerut"],
    Delhi: ["New Delhi", "Old Delhi", "Dwarka", "Rohini", "Ashok Nagar", "Okhla", "Janak Puri"],
    Maharashtra: ["Mumbai", "Pune",],
    Gujarat: ["Ahmedabad", "Surat"],
    Karnataka: ["Bengaluru", "Mysuru"],
    Rajasthan: ["Jaipur", "Jodhpur"],
    TamilNadu: ["Chennai", "Coimbatore"],
    WestBengal: ["Kolkata", "Howrah"],
    Punjab: ["Ludhiana", "Amritsar"],
    Bihar: ["Patna", "Gaya"],
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"],
    NewYork: ["New York City", "Buffalo"],
    Florida: ["Miami", "Orlando"],
    London: ["Camden", "Westminster"],
    Birmingham: ["Sutton", "Edgbaston"],
    Manchester: ["Salford", "Stockport"],
    Ontario: ["Toronto", "Ottawa"],
    Quebec: ["Montreal", "Quebec City"],
    British_Columbia: ["Vancouver", "Victoria"],
    New_South_Wales: ["Sydney", "Newcastle"],
    Victoria: ["Melbourne", "Geelong"],
    Queensland: ["Brisbane", "Gold Coast"],
    Bavaria: ["Munich", "Nuremberg"],
    Berlin: ["Berlin"],
    Hesse: ["Frankfurt", "Wiesbaden"],
    "Île-de-France": ["Paris"],
    Provence: ["Marseille", "Nice"],
    Normandy: ["Rouen", "Caen"],
    Tokyo: ["Shinjuku", "Shibuya"],
    Osaka: ["Kita", "Naniwa"],
    Kyoto: ["Fushimi", "Arashiyama"],
    "São Paulo": ["São Paulo City"],
    "Rio de Janeiro": ["Rio City"],
    Bahia: ["Salvador"],
    Gauteng: ["Johannesburg", "Pretoria"],
    "Western Cape": ["Cape Town"],
    "KwaZulu-Natal": ["Durban"],
  };
  res.json(citiesMap[state] || []);
};
