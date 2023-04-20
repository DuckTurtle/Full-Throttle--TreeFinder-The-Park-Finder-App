var apiKey = "W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";
var apiKeyW = "5282121f1a385049aa27e309e97fc347";
var curentPark = $("#itemStorgeBlock");
var runs = 0;    
var date = dayjs().format("MM/DD/YYYY");
 var parkCode = getParkCode();


init();

function getParkCode(){
    var codes =  document.location.search.split("=").pop();
    console.log(codes)
    return codes;
}

async function setLat(){
    var data = await getCords(parkCode);
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("Car Crash");
        return;
    }
    var currentCity = data.data[0].latitude;
    var lLat = currentCity;
    return lLat;
    
};

async function setLong(){
    var data = await getCords(parkCode);
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("Car Crash");
        return;
    }
    var currentCity = data.data[0].longitude;
    var lLong = currentCity;
    return lLong;
    
};
async function getCords(){
    var forcastAPI = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=" + apiKey;
    let dataResults = fetch(forcastAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
async function getParkInfo (){
    var forcastAPI = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=" + apiKey;
    let dataResults = fetch(forcastAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
async function setParkInfo(){
    var data = await getParkInfo(parkCode);
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("Please input a City");
        return;
    }
    var parkName = $("<h2>");
    parkName.addClass("text-center text-5xl mt-24 p-2 bg-stone-400");
    parkName.text(data.data[0].fullName);
    curentPark.append(parkName);

    var parkcost = $("<p>");
    var costText = $("<strong>");
    var costTitle = costText.text("Cost: ");
    parkcost.text(data.data[0].entranceFees[0].description);
    curentPark.append(costTitle, parkcost);
    parkcost.addClass("bg-stone-400 text-xl");
    costTitle.addClass("bg-stone-400 text-2xl");
    var parkCall = $("<p>");
    var callText = $("<strong>");
    var callTitle = callText.text("Phone number: ");
    parkCall.text(data.data[0].contacts.phoneNumbers[0].phoneNumber);
    curentPark.append(callTitle, parkCall);
    parkCall.addClass("bg-stone-400 text-xl");
    callTitle.addClass("bg-stone-400 text-2xl");

    var parklocation = $("<p>");
    var locationText = $("<strong>");
    var locationTitle = locationText.text("Location: ");
    parklocation.text( data.data[0].directionsInfo);
    curentPark.append(locationTitle, parklocation);
    parklocation.addClass("bg-stone-400 text-xl");
    locationTitle.addClass("bg-stone-400 text-2xl");

    var parkWebsite = $("<p>");
    var websiteText = $("<strong>");
    var websiteTitle = websiteText.text("Website: ");
    parkWebsite.text(data.data[0].directionsUrl);
    curentPark.append(websiteTitle, parkWebsite);
    parkWebsite.addClass("bg-stone-400 text-xl");
    websiteTitle.addClass("bg-stone-400 text-2xl");

    var parkHours = $("<p>");
    var hourText = $("<strong>");
    var hourTitle = hourText.text("Hours: ");
    parkHours.text(data.data[0].operatingHours[0].description);
    curentPark.append(hourTitle, parkHours);
    parkHours.addClass("bg-stone-400 text-xl");
    hourTitle.addClass("bg-stone-400 text-2xl");

}
//calls the weather api with given city.
async function getWeather (){
    var lat =  await setLat();
    var long = await setLong();
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apiKeyW + "&units=imperial";
    let dataResults = fetch(weatherAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
//calls the forcast and waits to pass it on till the api responds.
async function getOtherDayWeather (){
    var lat =  await setLat();
    var long = await setLong();
    var forcastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + apiKeyW + "&units=imperial";
    let dataResults = fetch(forcastAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
//sets all the text content for curent day weather
 async function setCurrentDay(){
    var data = await getWeather();
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("Please input a City");
        return;
    }
    //creates element for location and date
    var curentDayAnchor = $("#weatherDiv");
    var blockbox = $("<div>");
    blockbox.addClass("weatherBlock ml-10 border-e-8 border-t-4 border-stone-400");
    curentDayAnchor.append(blockbox)

    var daytext = $("<h4>");
    daytext.addClass("pl-2");
    daytext.text(data.name + " (" + date + ") ");
    blockbox.append(daytext);
    // adds weather img
    var coolIcon = $("<img>");
    coolIcon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    blockbox.append(coolIcon);
//  adds tempature element at text
    var tempa = $("<p>");
    tempa.addClass("pl-2");
    tempa.text("Temp: " + data.main.temp + "°F");
    blockbox.append(tempa);

};
// sets text values for forcast blocks. does same stuff as the one above but for the forcast
async function otherDayForcast(){
    var data = await getOtherDayWeather();
    console.log(data);
    if (!data){
        console.error("AHHHHH");
        return;
    }
    var forcatDayAnchor = $("#weatherDiv");
    for(i=4; i<40; i+=8){
    var blockbox = $("<div>");
    blockbox.addClass("weatherBlock ml-32 border-e-8 border-t-4 border-stone-400");
    forcatDayAnchor.append(blockbox)

    var daytext = $("<h4>");
    daytext.addClass("pl-2");
    var dateCovert = dayjs(data.list[i].dt_txt).format("MM/DD/YYYY")
    daytext.text(data.city.name + " (" + dateCovert + ") ");
    blockbox.append(daytext);

    var coolIcon = $("<img>");
    coolIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");
    blockbox.append(coolIcon);

    var tempa = $("<p>");
    tempa.addClass("pl-2");
    tempa.text("Temp: " + data.list[i].main.temp + "°F");
    blockbox.append(tempa);
    }
};
function clearOldStuff(){
    var curentday = document.getElementById("itemStorgeBlock");
    console.log(curentday);
    while (curentday.firstChild) {
        curentday.removeChild(curentday.firstChild);
      }
};

function init(){
    if( runs >= 1){
    clearOldStuff();
    }
    setCurrentDay();
    otherDayForcast();
getParkInfo();
setParkInfo();
}