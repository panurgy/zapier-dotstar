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

## Simulator

There's a barely functional simulator available in the `simulator` sub-dir.  Go into that dir and run `npm start`, which starts the simulator.


Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

![](https://lh3.googleusercontent.com/n3IHsGrAp1grp2IcCBfm2N_N9l2tuWEKmF9DJrCgGWJV7H7EiYS-uDwOVTOKDkQAJbpiSsl_LYgXDbuqLSxX_yxwCC3ZQEMiyD54exovYqKuBR5S_AmIwoedkugEQq4Q9UIFKScUKf9ZQvRKpcxKIkXbWLrZbj_E0tcE-QqkJPneJ8X9UFnQcFBZlJkxDvmxzQ3uWgF2qUXT3E45E_fYzGz8W_saWBLHQNFp8m8muv7DyPeh7xBk6JdHD3EwwZmVWROGWPTh-SVfr8WsxY7R8mjSxyym9-iYDce9e-ZCcTmOfEXPKD2hA6UCL_0lqjC0xMGTR9pvX001bt-KmipkyV2GzMVMq8uzbTY0BWbz7FBQi_ey9sFTFr_00mBKgIQwhDnva6KpGGozRE1YswluFliWtVe9lxaDWT_vQOh3PRnJBtytRqWvKHGkiTWtytwGmzFHliwCKj8YIvxXkxACbLgDn7w5ngBYoblLgmu8lzd3H2_NLIq--DTCtWq2o3EVqGiuKqEJ-3PxaE9B5YCi982tkJNDcr0u8kp4oTBBkoFCkMk1lcu6nXeEAcmnlR_p5aYFsi6MyUTk84tP3EsVjiTktKNizwpka15OZnTkXY9LOrPoiC2LJoM8rJzJonThbKZRGjb5M2hrmc_bwB3jdTuyJ1vh-uTtOrvOLfmDYg=w754-h625-no)
