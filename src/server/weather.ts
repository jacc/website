export async function getWeather(city: string) {
  try {
    const res = await fetch(
      `https://wttr.in/${encodeURIComponent(city)}?format=j1`
    );
    const data = await res.json();
    return {
      location: `${data.nearest_area?.[0]?.areaName?.[0]?.value}, ${data.nearest_area?.[0]?.region?.[0]?.value}`,
      tempF: data.current_condition?.[0]?.temp_F,
      desc: data.current_condition?.[0]?.weatherDesc?.[0]?.value,
    };
  } catch {
    return null;
  }
}
