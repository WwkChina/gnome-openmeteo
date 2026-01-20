/*
   SPDX-License-Identifier: GPL-3.0-or-later

   Open-Meteo GNOME Extension
   Weather data provided by Open-Meteo

   Copyright 2024 TealPenguin
   Copyright 2026 Weikang Wang   
*/

import Gio from "gi://Gio";

import { GeolocationProvider, WeatherPressureUnits } from "./constants.js";
import { Loc, NAME_TYPE, PLACE_TYPE, settingsSetLocs, settingsGetLocsCount} from "./locs.js";

const THIS_SCHEMA_ID   = "org.gnome.shell.extensions.openmeteo";

function tryMigratePre128(settings)
{
  let city = settings.get_string("city");
  if(!city) return false;

  let arr = [ ];
  let sections = city.split(" && ");
  for(let l of sections)
  {
    let place = l.split(">")[0];
    place = place.replace(/\s/g, "");
    let name  = l.split(">")[1];
    let isMyLoc = place === "here";
    let isMyLocName = isMyLoc && !name;
    arr.push(
      new Loc(
        isMyLocName ? NAME_TYPE.MY_LOC : NAME_TYPE.CUSTOM,
        name,
        isMyLoc ? PLACE_TYPE.MY_LOC : PLACE_TYPE.COORDS,
        isMyLoc ? "" : place
      )
    );
  }

  settings.reset("city");
  settingsSetLocs(settings, arr);

  console.log("Open-Meteo: Migrated from cities to v128 locs.");
  return true;
}

function tryMigratePre130(settings)
{
  if(settings.get_enum("pressure-unit") === WeatherPressureUnits.HPA)
  {
    settings.set_enum("pressure-unit", WeatherPressureUnits.MBAR);
  }

  let locCount = settingsGetLocsCount(settings);
  let selIndex = settings.get_int("actual-city");
  if(selIndex < 0 || selIndex > locCount)
  {
    settings.set_int("actual-city", selIndex < 0 ? 0 : locCount - 1);
  }

}

function migrateProviders(settings)
{
  let geoSearch = settings.get_enum("geolocation-provider");
  if(geoSearch === GeolocationProvider.GEOCODE) settings.set_enum("geolocation-provider", GeolocationProvider.OPENSTREETMAPS);
}

export function tryImportAndMigrate(settings)
{
  tryMigrateFromOldVersion(settings);
  return imported;
}

export function tryMigrateFromOldVersion(settings)
{
  tryMigratePre128(settings);
  tryMigratePre130(settings);
  migrateProviders(settings);
}
