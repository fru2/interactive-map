export const fetchLocation = async (query, toast) => {
  if (!query) return;
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    if (data.length === 0) {
      toast({ title: "Location Not Found", description: "Try a different name.", variant: "destructive" });
      return null;
    }
    return { id: Date.now(), lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), name: query };
  } catch (error) {
    toast({ title: "Error", description: "Failed to fetch location.", variant: "destructive" });
    return null;
  }
};
