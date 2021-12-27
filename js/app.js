window.setInterval(function () {
  clock();
}, 10);

document.addEventListener("keydown", toggleClock);

function toggleClock(e) {
  let decClock = document.getElementById("dec-clock");
  if (e.code === "KeyD") {
    if (decClock.style.opacity == "0") {
      decClock.style.opacity = "0.5";
    } else {
      decClock.style.opacity = "0";
    }
  }
  let hexClock = document.getElementById("hex-clock");
  if (e.code === "KeyH") {
    if (hexClock.style.opacity == "0") {
      hexClock.style.opacity = "0.5";
    } else {
      hexClock.style.opacity = "0";
    }
  }
  let binClock = document.getElementById("bin-clock");
  if (e.code === "KeyB") {
    if (binClock.style.opacity == "0") {
      binClock.style.opacity = "0.5";
    } else {
      binClock.style.opacity = "0";
    }
  }
  let metricClock = document.getElementById("metric-clock");
  if (e.code === "KeyM") {
    if (metricClock.style.opacity == "0") {
      metricClock.style.opacity = "0.5";
    } else {
      metricClock.style.opacity = "0";
    }
  }
}

function tick(item, _) {
  let [n, t] = item;
  // let n = item[0];
  // let t = item[1];
  let bits = Array.from(t).reverse();
  for (let i = 0; i < bits.length; ++i) {
    if ((n >> i) & (1 === 1)) {
      bits[i].style.opacity = "1.0";
      bits[i].style.boxShadow = "0 0 4px 4px #22e122";
    } else {
      bits[i].style.opacity = "0.2";
      bits[i].style.boxShadow = "0 0 0 0 #000";
    }
  }
}

function dotClock(hours, minutes, seconds) {


  let time = [
    [seconds % 10, document.getElementsByClassName("s-2")],
    [
      ((seconds - (seconds % 10)) / 10) % 10,
      document.getElementsByClassName("s-1"),
    ],
    [minutes % 10, document.getElementsByClassName("m-2")],
    [
      ((minutes - (minutes % 10)) / 10) % 10,
      document.getElementsByClassName("m-1"),
    ],
    [hours % 10, document.getElementsByClassName("h-2")],
    [
      ((hours - (hours % 10)) / 10) % 10,
      document.getElementsByClassName("h-1"),
    ],
  ];

  time.forEach(tick);
}


function clockBinary(hours, minutes, seconds) {
  let binClock = document.getElementById("bc");
  let binHour = hours.toString(2).padStart(6, "0");
  let binMinute = minutes.toString(2).padStart(6, "0");
  let binSecond = seconds.toString(2).padStart(6, "0");
  binClock.innerHTML = binHour + ":" + binMinute + ":" + binSecond;
}

function clockHex(hours, minutes, seconds) {
  let hexClock = document.getElementById("hc");
  //    let hexHour = hours < 16 ? '0' + hours.toString(16) : hours.toString(16);
  //    let hexMinute = minutes < 16 ? '0' + minutes.toString(16) : minutes.toString(16);
  //    let hexSecond = seconds < 16 ? '0' + seconds.toString(16) : seconds.toString(16);
  let hexHour = hours.toString(16).padStart(2, "0");
  let hexMinute = minutes.toString(16).padStart(2, "0");
  let hexSecond = seconds.toString(16).padStart(2, "0");
  hexClock.innerHTML = hexHour + ":" + hexMinute + ":" + hexSecond;
}

function clockMetric(hours, minutes, seconds, milliseconds) {
  const CYCLES_PER_DAY = 1;
  const HOURS_PER_DAY = 10;
  const HOURS_PER_CYCLE = HOURS_PER_DAY / CYCLES_PER_DAY;
  const MINUTES_PER_HOUR = 100;
  const SECONDS_PER_MINUTE = 100;
  let total_milliseconds =
    hours * 3600000 +
    minutes * 60000 +
    seconds * 1000 +
    milliseconds;
  let metricHour =
    ((total_milliseconds / 86400000) * HOURS_PER_DAY) % HOURS_PER_CYCLE;
  let metricMinute =
    ((total_milliseconds % (86400000 / HOURS_PER_DAY)) /
      (86400000 / HOURS_PER_DAY)) *
    MINUTES_PER_HOUR;
  let metricSecond =
    ((total_milliseconds % (86400000 / HOURS_PER_DAY / MINUTES_PER_HOUR)) /
      (86400000 / HOURS_PER_DAY / MINUTES_PER_HOUR)) *
    SECONDS_PER_MINUTE;
  metricHour = Math.floor(metricHour).toString().padStart(2, "0");
  metricMinute = Math.floor(metricMinute).toString().padStart(2, "0");
  metricSecond = Math.floor(metricSecond).toString().padStart(2, "0");
  let metricClock = document.getElementById("mc");
  metricClock.innerHTML = metricHour + ":" + metricMinute + ":" + metricSecond;

}

function clockDecimal(hours, minutes, seconds) {
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let decClock = document.getElementById("dc");
  decClock.innerHTML = hours + ":" + minutes + ":" + seconds;

}

function clock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();

  dotClock(hours, minutes, seconds);
  clockBinary(hours, minutes, seconds);
  clockHex(hours, minutes, seconds);
  clockMetric(hours, minutes, seconds, milliseconds);
  clockDecimal(hours, minutes, seconds);
  
}
