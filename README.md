# zapier-dotstar
Blinks lots of LEDs

This project uses a Raspberry Pi SPI port to drive a bunch of DotStar LEDs.
The trick is that the LEDs are arranged in a specific geometry, which makes
all of the shows work.

The shows attempt to avoid using any stateful information/counters, instead
all of the LED states are calculated from the current time/millisecond value.

It's not important that your Raspi know the current/real-time, instead, it's
only important that the clock is consistent.

![](https://lh3.googleusercontent.com/pqGe6vD4UgdzFBEffIM--6VjyRzM9cULQTOnW4FaxG6ECzPRNOOrw53y_1qQOo95rLWvT4VhwVvdhdE2D69CD_8BXs7yw_xMhGJ_FnF20gvnYsMJpfdXZotlDYbMT9GYPILCow=w469-h625-no)

## Getting started

If you're using a fresh installation of [Raspbian Jessie](https://www.raspberrypi.org/downloads/raspbian/), here are a few things you may need to do/configure using `sudo raspi-config`:

 * If you're in the United states, you probably want the [US keyboard layout](https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=80127)
 * Enable the SSH server
 * Enable [the SPI port](https://www.raspberrypi.org/documentation/hardware/raspberrypi/spi/README.md)
 * I personally prefer to have my RasPi boot to a command prompt (rather than a graphical desktop)
 * Change the "pi" user's password
 
After rebooting the RasPi, you may need to do the following: 
 * Setup the WiFi Internet connection
 * Install a newer version of NodeJS (v4 or v7)
 * Use git to clone this repo
 * run `npm install` to download the necessary modules

At this point, it's time to make some physical connections. There are four pins/wires that are needed to connect the RasPi with the Dotstar LEDs.  The tricky part is that the RasPi uses 3.3v binary communications, whereas the Dotstar LEDs use 5v binary - thus a converter is needed in between.

The simplest approach is to connect up a [74AHCT125](https://www.adafruit.com/product/1787), and connect it up [like this](https://learn.adafruit.com/dotstar-pi-painter/assembly-part-1#test-dotstar-strip).  Here are some photos that [show the connections IRL](https://goo.gl/photos/B2kW2PPmSDQrdHkF8).

## Running the program/shows

The entry point is `cnc.js`.  Before starting that, you'll want to set an environment variable, which tells your RasPi which "secret key" to use when fetching commands from the CnC server at https://store.zapier.com

For example:
```sh
$ export SECRET_KEY=this_is_cool
$ node cnc.js
```

Then use Postman, or `curl` to POST settings the CnC server key that you specified.
```sh
$ curl -X POST -H "Content-Type: application/json" --data '{ "fgshow": "alternate", "bgcolor": { "r": 200, "g": 20, "b": 20 }, "bgshow": "solid", "fgcolor": { "r": 200, "g": 200, "b": 200 } }' https://store.zapier.com/api/records?secret=this_is_cool
```

The valid names for the "shows" are listed within the [shows subdirectory](https://github.com/panurgy/zapier-dotstar/tree/master/shows).  If you develop a new show, please submit a Pull Request and share it with us!

## Simulator

There's a barely functional simulator available in the `simulator` sub-dir.  Go into that dir and run `npm start`, which starts the simulator.


Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

![](https://lh3.googleusercontent.com/n3IHsGrAp1grp2IcCBfm2N_N9l2tuWEKmF9DJrCgGWJV7H7EiYS-uDwOVTOKDkQAJbpiSsl_LYgXDbuqLSxX_yxwCC3ZQEMiyD54exovYqKuBR5S_AmIwoedkugEQq4Q9UIFKScUKf9ZQvRKpcxKIkXbWLrZbj_E0tcE-QqkJPneJ8X9UFnQcFBZlJkxDvmxzQ3uWgF2qUXT3E45E_fYzGz8W_saWBLHQNFp8m8muv7DyPeh7xBk6JdHD3EwwZmVWROGWPTh-SVfr8WsxY7R8mjSxyym9-iYDce9e-ZCcTmOfEXPKD2hA6UCL_0lqjC0xMGTR9pvX001bt-KmipkyV2GzMVMq8uzbTY0BWbz7FBQi_ey9sFTFr_00mBKgIQwhDnva6KpGGozRE1YswluFliWtVe9lxaDWT_vQOh3PRnJBtytRqWvKHGkiTWtytwGmzFHliwCKj8YIvxXkxACbLgDn7w5ngBYoblLgmu8lzd3H2_NLIq--DTCtWq2o3EVqGiuKqEJ-3PxaE9B5YCi982tkJNDcr0u8kp4oTBBkoFCkMk1lcu6nXeEAcmnlR_p5aYFsi6MyUTk84tP3EsVjiTktKNizwpka15OZnTkXY9LOrPoiC2LJoM8rJzJonThbKZRGjb5M2hrmc_bwB3jdTuyJ1vh-uTtOrvOLfmDYg=w754-h625-no)
