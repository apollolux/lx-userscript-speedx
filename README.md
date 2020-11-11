# About LX::speedX #

This is a userscript to enable more playback speed options for online embedded video players like YouTube that may or may not offer speed control in their interfaces. YouTube specifically only offers up to 2x speed, while this script offers 3x, 4x, 8x, and 16x in addition to the eight options already available.


# Default Supported Websites #

youtube.com


# Notes #

The control panel appears after a delay on YouTube mainly because YouTube uses a Polymer-based custom element framework which not only hijacks page lifecycle-based event handling but also full-on replaces elements in the DOM. This delay is to allow the page time to do its nonsense before injecting the panel, otherwise the panel gets replaced or simply not added at all. On YouTube specifically, the location and placement of the panel is dependent on the existence of the sticky header.

The scripted radio buttons target the first video element they find on the page. This also bypasses (on YouTube, at least) the scripted speed control interface of the embedded player, and choosing in the panel doesn't reflect in the existing speed control. A future update of this script may resolve that.
