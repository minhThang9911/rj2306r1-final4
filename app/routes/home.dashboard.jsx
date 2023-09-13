import { useActionData } from "@remix-run/react";
import { uploadImg } from "~/server/upload.server";
import ReactWeather, { useOpenWeather } from "~/components/Weather";
export const action = async ({ request, params }) => {
	return null;
};

export default function DashboardPage() {
	const { data, isLoading, errorMessage } = useOpenWeather({
		key: "d6a5f2be07d308324adda7c689af586b",
		lat: "48.137154",
		lon: "11.576124",
		lang: "en",
		unit: "metric", // values are (metric, standard, imperial)
	});

	return (
		<div>
			<ReactWeather
				isLoading={isLoading}
				errorMessage={errorMessage}
				data={data}
				lang="en"
				locationLabel="Munich"
				unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
				showForecast
			/>
		</div>
	);
}
