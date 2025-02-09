import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Use your API key environment variable
const genAI = new GoogleGenerativeAI(apiKey);

const LocationDetails = ({ name, lat, long }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: "You are a tour guide.  Provide the information in JSON format.",
      });

      const generationConfig = {
        temperature: 0.5, // Reduced temperature for more consistent results
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048, // Adjusted token limit
        responseMimeType: "application/json", // Important for JSON parsing
      };

      const prompt = `Give a brief description, top 5 famous places (just names), and top 5 famous foods (just names) for ${name}. Return the response in the following JSON format:
      \`\`\`json
      {
        "description": "description of the place",
        "places": ["place1", "place2", "place3", "place4", "place5"],
        "foods": ["food1", "food2", "food3", "food4", "food5"]
      }
      \`\`\``;


      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      const responseText = result.response.text();

      try {
        const jsonData = JSON.parse(responseText);
        setData(jsonData);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        console.error("Raw response:", responseText); // Log the raw response for debugging
        // Handle the parsing error, perhaps by displaying an error message to the user.
        setData({ description: "Error fetching data. Please try again later.", places: [], foods: [] });
      }

    } catch (error) {
      console.error("Error fetching location data:", error);
      setData({ description: "Error fetching data. Please try again later.", places: [], foods: [] }); // Set default data in case of error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  return (
    <div className="p-4 bg-white text-gray-900 rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm text-gray-500">Latitude: {lat} | Longitude: {long}</p>

      {loading ? (
        <div className="flex justify-center items-center my-6">
          <Loader2 className="animate-spin w-8 h-8 text-gray-900" />
        </div>
      ) : (
        data && (
          <>
            <p className="mt-4 text-gray-700 leading-normal">{data.description}</p>

            <h3 className="mt-6 font-semibold">Famous Places</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.places.map((place, index) => (
                <Badge variant="outline" key={index} className="text-zinc-800 px-3 py-1 font-light">
                  {place}
                </Badge>
              ))}
            </div>

            <h3 className="mt-6 font-semibold">Famous Foods</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.foods.map((food, index) => (
                <Badge variant="outline" key={index} className="text-zinc-800 px-3 py-1 font-light">
                  {food}
                </Badge>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default LocationDetails;
