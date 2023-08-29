import { json } from "@remix-run/node";
import { useCallback } from "react";

function DashboardPage() {
    const handleTest = useCallback(async (imgSrc) => {
        console.log("running");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, referer-path"
        );

        var urlencoded = new URLSearchParams();
        urlencoded.append("action", "upload");
        urlencoded.append(
            "source",
            "https://inkythuatso.com/uploads/thumbnails/800/2022/05/1-hinh-nen-dien-thoai-mau-xanh-la-cay-inkythuatso-17-15-21-55.jpg"
        );

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        };

        const result = await fetch(
            "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
            requestOptions
        ).then((response) => response.text());
        console.log(result);
        console.log("run Done");
    }, []);
    return (
        <div>
            <button
                className="border-3"
                onClick={handleTest}>
                Test Upload
            </button>
        </div>
    );
}

export default DashboardPage;
