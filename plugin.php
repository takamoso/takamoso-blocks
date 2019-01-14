<?php

/**
 * Plugin name: Takamoso Blocks
 * Version: 0.0.1
 * Description: Useful blocks plugin for Gutenberg.
 * Author: takamoso
 * Author URI: https://twitter.com/takamosoo
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

defined('ABSPATH') || exit;

/**
 * Editor and front view
 */

add_action('enqueue_block_assets', function() {
  
});

/**
 * Editor view
 */

add_action('enqueue_block_editor_assets', function() {
  wp_enqueue_script(
    'takamoso-blocks-editor',
    plugins_url('editor.js', __FILE__),
    [],
    filemtime(plugin_dir_path(__FILE__).'editor.js'),
    true
  );

  wp_enqueue_style(
    'takamoso-blocks-editor',
    plugins_url('editor.css', __FILE__),
    [],
    filemtime(plugin_dir_path(__FILE__).'editor.css')
  );

  wp_add_inline_script(
    'takamoso-blocks-editor',
    "var plugin_dir_url = '".plugin_dir_url(__FILE__)."'",
    'before'
  );
});

/**
 * Front view
 */

add_action('wp_enqueue_scripts', function() {
  wp_enqueue_style(
    'takamoso-blocks-front',
    plugins_url('front.css', __FILE__),
    [],
    filemtime(plugin_dir_path(__FILE__).'front.css')
  );

  wp_enqueue_script(
    'takamoso-blocks-front',
    plugins_url('front.js', __FILE__),
    [],
    filemtime(plugin_dir_path(__FILE__).'front.js'),
    true
  );

  wp_add_inline_script(
    'takamoso-blocks-front',
    "var plugin_dir_url = '".plugin_dir_url(__FILE__)."'",
    'before'
  );
});

/**
 * Add block category
 */

add_filter('block_categories', function($categories, $post) {
  return array_merge($categories, [[
    'slug' => 'takamoso-blocks',
    'title' => 'Takamoso Blocks',
    'icon' => 'grid-view'
  ]]);
}, 10, 2);