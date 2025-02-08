import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Loader2 } from "lucide-react";

const LocationDetails = ({ name, lat, long }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (attempt = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Give a brief description, top 5 famous places (just names), and top 5 famous foods (just names) for ${name}.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const result = await response.json();
      console.log(`API Response (Attempt ${attempt}):`, result);

      // Extract AI response text
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Extract description, places, and foods
      const descriptionMatch = text.match(/^(.*)\n\n\*\*Top 5 Famous Places:/s);
      const matches = text.match(/\*\*Top 5 Famous Places:\*\*(.*)\*\*Top 5 Famous Foods:\*\*(.*)/s);

      const description = descriptionMatch ? descriptionMatch[1].trim() : "";
      const places = matches?.[1]?.trim().split("\n").map((p) => p.replace(/^\d+\.\s*/, "")) || [];
      const foods = matches?.[2]?.trim().split("\n").map((f) => f.replace(/^\d+\.\s*/, "")) || [];

      if (!description && places.length === 0 && foods.length === 0 && attempt < 3) {
        console.warn(`Empty response, retrying... (Attempt ${attempt + 1})`);
        setTimeout(() => fetchData(attempt + 1), 500); // Retry with a slight delay
      } else {
        setData({ description, places, foods });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
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
