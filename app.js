const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

localStorage.setItem(
  "apikey",
  EncryptStringAES("1b846b82cc63db36c8ec885b703a20f3")
);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  let apikey = DecryptStringAES(localStorage.getItem("apikey"));
  let inputVal = input.value;
  // console.log(apikey);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apikey}&units=${weatherType}`;
  
    try {
const response = await axios.get(url);
  //console.log(response);
  const { main, name, sys, weather } = response.data;
  //console.log(name);
        const cityListItems = list.querySelectorAll('.city');
        const cityListItemArray = Array.from(cityListItems);
        if (cityListItemArray.length > 0) { 
            const filteredArray = cityListItemArray.filter((card) => card.querySelector('.city-name span').innerText == name);
            if (filteredArray.length > 0) {
                msg.innerText = `You already know the weather for ${
                  filteredArray[0].querySelector(".city-name span").innerText
                }, Please search for another city!!!`;
                form.reset();
                input.focus();
                return;
              }
        }
  const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
  console.log(iconUrl);

  const createdCityCardLi = document.createElement("li");
  createdCityCardLi.classList.add("city");
  const createdCityCardLiInnerHtml = `
    <div class = "head">
    <h2 class="city-name" data-name="${name}, ${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
    </h2>
  <button><i style="font-size: 2rem;" class="fas fa-window-close"></i></button>
  </div>
    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
    <figure>
      <img class="city-icon" src="${iconUrl}">
      <figcaption>${weather[0].description}</figcaption>
    </figure>`;

    createdCityCardLi.innerHTML = createdCityCardLiInnerHtml;
    list.appendChild(createdCityCardLi);

    msg.innerText = '';
    form.reset();
    input.focus(); 
    } catch (error) {
        msg.innerText = error;
    }
};
