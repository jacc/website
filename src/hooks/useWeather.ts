import { useState, useEffect } from "react";

interface WeatherData {
  location?: string;
  tempF?: string;
  desc?: string;
}

export function useWeather(city: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://wttr.in/${encodeURIComponent(city)}?format=j1`
        );
        const data = await res.json();
        setWeather({
          location: `${data.nearest_area?.[0]?.areaName?.[0]?.value}, ${data.nearest_area?.[0]?.region?.[0]?.value}`,
          tempF: data.current_condition?.[0]?.temp_F,
          desc: data.current_condition?.[0]?.weatherDesc?.[0]?.value,
        });
      } catch {
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather every hour
    const interval = setInterval(fetchWeather, 3600000);
    return () => clearInterval(interval);
  }, [city]);

  return { weather, loading };
}
