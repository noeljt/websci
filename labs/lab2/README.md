=====================================================================
Lab 2 - APIs
=====================================================================
Author: Joseph Noel (noelj)
=====================================================================

Tech:

-dark sky API for weather (https://darksky.net/dev/)
-google maps geocoding API for city/state (https://developers.google.com/maps/documentation/geocoding/start)
-Javascript Date object for time information
-jQuery for DOM traversal and manipulation
-Bootstrap for responsive grids (ended up giving it a max width because smaller size looks significantly better, but most of it is responsive)
-skycons for animation (https://github.com/darkskyapp/skycons)

Inspiration:

https://www.themezy.com/free-website-templates/128-steel-weather-free-responsive-website-template

-didn't use any code from it, just general design and three icons

Data Used from Dark Sky API:

-current:
--temperature
--precipitation chance
--wind direction
--wind speed

-forecast:
--average temp (of min/max)
--summary icon

Animation:

-skycons have animations
-I'm assuming "Use CSS transitions/animations" wasn't a strict requirement

Notes:

-significant delay in presenting weather and location data (asnychronous calls)
--was unsure of standard practice but I put a bunch of elipses as "loading" placeholders

Extra Credit:

-added self signed certificate to my apache and developed on my virtual host in chrome
-basically followed https://getgrav.org/blog/macos-sierra-apache-ssl
-can give proof if necessary? (easiest way is for me to show in class honestly)
