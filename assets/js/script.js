//key
var apiKey = "W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";

//state data
var states = document.getElementsByTagName("option");
chosenstatecode=[];
for (var i = 0; i < states.length ; i++) {
    states[i].addEventListener("click", 
        function (event) {
            console.log([i].value)
            chosenstatecode+='[i]'
            event.preventDefault();
        }, 
        false);
        }
console.log(chosenstatecode)
// pass park code  though location
var pageAnchor = $("#results")
async function getParks(){
    var state = "wi";
    var parkAPI = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";
    let dataResults = fetch(parkAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
async function setParkBubbles(){
    var data = await getParks();
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("AHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
        return;
    }
     for(i=0; i<data.data.length; i++){
    var parkdiv = $("<button>");
    parkdiv.attr({id: data.data[i].parkCode});
    pageAnchor.append(parkdiv);
    parkdiv.addClass("");

    var coolIcon = $("<img>");
    coolIcon.attr("src",  data.data[i].images[0].url);
    parkdiv.append(coolIcon);
    coolIcon.addClass("");

    var parkName = $("<h2>");
    parkName.addClass("text-center text-3xl mt-24 ml-8 p-2");
    parkName.text(data.data[i].fullName);
    parkdiv.append(parkName);

    parkdiv.on("click", function (event) {
        event.preventDefault();

        var parkCode = "'" + data.data[i].parkCode + "'";

        var queryString = './resortpage.html?q=' + parkCode;
        location.assign(queryString);
      });


    }
     
};
setParkBubbles();