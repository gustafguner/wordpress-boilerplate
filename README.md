# wordpress-boilerplate

A simple Wordpress theme boilerplate.

## Setup

1. `cd` to `wp-content/themes`
2. Install the dependencies via

```sh
$ npm install
```

## Development

To start developing, run

```sh
$ gulp
```

Gulp will now look for changes in your files and update them correspondingly.
[LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) is supported.

## Production

To build for production, run

```sh
$ gulp build
```

This will build your theme for production and output it to the `dist` directory.
