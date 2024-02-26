import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const API_KEY = '566fcf4a205e2ec7633ccd442a3649a0';
const CITY = 'New York'; // Or any other city you want to get the weather for


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
    const cityName = req.body.city;
    if (!cityName) {
        console.log("Please provide a city name.");
        return res.render("index.ejs", { error: "Please provide a valid city name." });
    }
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
   
    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        //console.log(weatherData.main.temp);
        // console.log(weatherData);
        console.log(weatherData.weather[0].main);
        res.render("weather.ejs", { result: weatherData });
    } catch (error) {
        console.error(error);
        res.render("index.ejs", { error: "An error occurred while fetching the weather data." });
    }
});



app.listen(port, () => console.log(`Server started at port ${port}`));

