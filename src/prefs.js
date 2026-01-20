/*
    SPDX-License-Identifier: GPL-3.0-or-later

    Open-Meteo GNOME Extension
    Weather data provided by Open-Meteo

    Copyright 2022 Jason Oickle
    Copyright 2026 Weikang Wang
*/

import Gdk from "gi://Gdk";
import Gtk from "gi://Gtk";

import {
  ExtensionPreferences,
  gettext as _,
} from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

// Import preferences pages
import { GeneralPage } from "./preferences/generalPage.js";
import { LayoutPage } from "./preferences/layoutPage.js";
import { LocationsPage } from "./preferences/locationsPage.js";
import { AboutPage } from "./preferences/aboutPage.js";

export default class OpenMeteoPreferences extends ExtensionPreferences { 
  fillPreferencesWindow(window) {
    // ---- Icon theme ----
    const display = Gdk.Display.get_default();
    const iconTheme = Gtk.IconTheme.get_for_display(display);

    const mediaPath = `${this.metadata.path}/media`;
    if (!iconTheme.get_search_path().includes(mediaPath)) {
      iconTheme.add_search_path(mediaPath);
    }

    // ---- Settings ----
    const settings = this.getSettings();

    // ---- Pages ----
    window.add(new GeneralPage(this.metadata, settings, window));
    window.add(new LayoutPage(this.metadata, settings));
    window.add(new LocationsPage(this.metadata, settings, window));
    window.add(new AboutPage(this.metadata, settings, window));

    // ---- Window properties ----
    const prefsWidth = settings.get_int("prefs-default-width");
    const prefsHeight = settings.get_int("prefs-default-height");

    window.set_default_size(prefsWidth, prefsHeight);
    window.set_search_enabled(true);

    // ---- Save size on close ----
    window.connect("close-request", () => {
      const [width, height] = window.get_default_size();

      if (width > 0 && height > 0) {
        settings.set_int("prefs-default-width", width);
        settings.set_int("prefs-default-height", height);
      }
      return false;
    });
  }
}
