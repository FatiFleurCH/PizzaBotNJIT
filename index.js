
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('i.fas.fa-pizza-slice')
let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');
container.appendChild(paragraph);
const sound = document.querySelector('.sound');

var person = prompt("Please enter your name", "Harry Potter");

icon.addEventListener('click', () => {
  sound.play();
  dictate();
});

const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    
    paragraph.textContent = speechToText;

    if (event.results[0].isFinal) {

      if (speechToText.includes('what time is it')) {
          speak(getTime);
      };
      
      if (speechToText.includes('what is today\'s date')) {
          speak(getDate);
      };
      
      if (speechToText.includes('what is the weather in')) {
          getTheWeather(speechToText);
      };

      if (speechToText.includes('thank you')) {
        speak(welcome); // need to give a reply
    };
    if (speechToText.includes('how old are you')) {
        speak(age); // need to give a reply
    };

    if (speechToText.includes('how to make a pizza')) {
      speak(pizza); // need to give a reply
  };
    }
  }

}

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
  const time = new Date(Date.now());
  return ` ${person} the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
};

const pizza = () => {
  return `Google it`;
};

const welcome = () => {
    return ` ${person} your welcome`;
};

const age = () => {
    return ` ${person} I am a robot, I don't have an age`;
};

const getDate = () => {
  const time = new Date(Date.now())
  return ` ${person} today is ${time.toLocaleDateString()}`;
};

const getTheWeather = (speech) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`) 
  .then(function(response){
    return response.json();
  })
  .then(function(weather){
    if (weather.cod === '404') {
      utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
      synth.speak(utterThis);
      return;
    }
    utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
    synth.speak(utterThis);
  });
};


