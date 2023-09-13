import ReactWeather from "react-open-weather";
import useWeatherBit from "~/hooks/weatherbit/useWeatherBit";

export const action = async ({ request, params }) => {
	return null;
};

const weatherCity = "Ho Chi Minh";
export default function DashboardPage() {
	const { data, isLoading, errorMessage } = useWeatherBit({
		key: "1d868f8f8f13445a9a064484068ae5a5",
		city: weatherCity,
		lang: "en",
		unit: "M", // values are (M,S,I)
	});

	return (
		<div>
			<ReactWeather
				isLoading={isLoading}
				errorMessage={errorMessage}
				data={data}
				lang="en"
				locationLabel={weatherCity}
				unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
				showForecast
			/>
		</div>
	);
}
