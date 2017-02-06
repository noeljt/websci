=====================================================================
Lab 1 - local JSON twitter feed
=====================================================================
Author: Joseph Noel (noelj)
=====================================================================

Timing:
-Tweet cycle 1 in/out every 3 seconds
-Time zones cycle 1 in/out every 5 seconds
-Done using setInterval

Animation/Transitions:
-start with all JSON HTML hidden
-show initial rows (5 for tweets, 3 for time zones)
-use jQuery slideUp to get rid of top row
-simultaneously use jQuery slideDown to bring in a new row

Bootstrap:
-used container, row, columns, etc from Bootstrap
-two feeds are side by side on larger screens
-two feeds will collapse vertically for smaller widths
-posts within feeds will also resize due to nested grids

Appearance:
-looked at twitter design guide
-used their specified blue primary color and white as secondary
-used some other things like border radius and box shadow just because it looked nicer

Displayed Information:
-user's profile picture
-tweet's text
-time zones
-how many parsed users were in each time zone

Notes:
- "mask" class naming was a relic from original attempt to animate using a mask and hidden overflow... but responsive design with that was a pain
- For the time zone statistics, the most common was "null" since not everyone has a time zone set, so I changed it to "Unkown" just to look better

Time Zone Feed:
-originally wanted to use this data to create a map with each timezone colored according to my data (heat map type deal)
-but ranking each time zone by most users was much less time consuming, albeit less interesting