<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress*/
define('DB_NAME', 'rif1418008281462');
define('WP_MEMORY_LIMIT', '312M');

/** MySQL database username */
define('DB_USER', 'rif1418008281462');

/** MySQL database password */
define('DB_PASSWORD', 'g7R#O2OMfiV');

/** MySQL hostname */
define('DB_HOST', 'rif1418008281462.db.12086251.hostedresource.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Oa)H)PIsInMs1#Za3O%7');
define('SECURE_AUTH_KEY',  '&YYbwSrKAPX=-cQ1=&/S');
define('LOGGED_IN_KEY',    'WC_Cw0WE2(xvB=3xcrv9');
define('NONCE_KEY',        '#7@chf$=KkE0+D=0EDpj');
define('AUTH_SALT',        'f*XVTDj!2-6ZS*xc=8tH');
define('SECURE_AUTH_SALT', ')9D88BE+YdQWntq_6/KD');
define('LOGGED_IN_SALT',   '_q2y9my*$+_cqOST!-Ez');
define('NONCE_SALT',       '&-IN=DG#(qx_rP8p97zH');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
