/*
  SPDX-License-Identifier: GPL-3.0-or-later

  Open-Meteo GNOME Extension
  Weather data provided by Open-Meteo

  Copyright2026 Weikang Wang
*/

const WeatherIcons =
{
  CLEAR: "clear",
  CLOUDS: "few-clouds",
  FEW_CLOUDS: "few-clouds",
  FOG: "fog",
  FREEZING_RAIN: "freezing-rain",
  FREEZING_SCATTERED_RAIN: "freezing-rain",
  FREEZING_SCATTERED_RAIN_STORM: "freezing-rain",
  FREEZING_STORM: "freezing-storm",
  HAIL: "snow",
  MANY_CLOUDS: "overcast",
  MIST: "fog",
  OVERCAST: "overcast",
  SHOWERS: "showers",
  SHOWERS_SCATTERED: "showers-scattered",
  SHOWERS_SCATTERED_STORM: "storm",
  SNOW: "snow",
  SNOW_RAIN: "snow",
  SNOW_SCATTERED: "snow",
  SNOW_SCATTERED_STORM: "snow",
  SNOW_STORM: "snow",
  STORM: "storm",
  WINDY: "windy",
  TORNADO: "tornado"
};

const OpenMeteoIconMap =
{
  0:  WeatherIcons.CLEAR,

  1:  WeatherIcons.FEW_CLOUDS,
  2:  WeatherIcons.CLOUDS,
  3:  WeatherIcons.OVERCAST,

  45: WeatherIcons.FOG,
  48: WeatherIcons.FOG,

  51: WeatherIcons.SHOWERS_SCATTERED,
  53: WeatherIcons.SHOWERS_SCATTERED,
  55: WeatherIcons.SHOWERS,

  56: WeatherIcons.FREEZING_SCATTERED_RAIN,
  57: WeatherIcons.FREEZING_RAIN,

  61: WeatherIcons.SHOWERS_SCATTERED,
  63: WeatherIcons.SHOWERS,
  65: WeatherIcons.SHOWERS,

  66: WeatherIcons.FREEZING_SCATTERED_RAIN,
  67: WeatherIcons.FREEZING_RAIN,

  71: WeatherIcons.SNOW_SCATTERED,
  73: WeatherIcons.SNOW,
  75: WeatherIcons.SNOW,
  77: WeatherIcons.SNOW,

  80: WeatherIcons.SHOWERS_SCATTERED,
  81: WeatherIcons.SHOWERS,
  82: WeatherIcons.SHOWERS,

  85: WeatherIcons.SNOW_SCATTERED,
  86: WeatherIcons.SNOW,

  95: WeatherIcons.STORM,
  96: WeatherIcons.STORM,
  99: WeatherIcons.STORM
};

function hasNightVariant(name)
{
  return name === "clear" || name === "few-clouds";
}

/**
  * @param {boolean} isNight
  * @param {boolean} useSymbolic
  */
export function getIconName(provider, key, isNight, useSymbolic)
{
  let name;

  // 只支持 Open-Meteo
  if (typeof key === "number")
    name = OpenMeteoIconMap[key];

  if (!name)
    name = WeatherIcons.CLOUDS;

  let fullName = "weather-" + name;

  if (isNight && hasNightVariant(name))
    fullName += "-night";

  fullName += "-symbolic";
  return fullName;
}

const OpenMeteoConditionMap =
{
  0:  "Clear sky",

  1:  "Mainly clear",
  2:  "Partly cloudy",
  3:  "Overcast",

  45: "Fog",
  48: "Depositing rime fog",

  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",

  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",

  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",

  66: "Light freezing rain",
  67: "Heavy freezing rain",

  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",

  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",

  85: "Slight snow showers",
  86: "Heavy snow showers",

  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

/**
  * @returns {string}
  */
export function gettextCondition(provider, code, gettext)
{
  return gettext(OpenMeteoConditionMap[code] ?? "Not available");
}
