<?php
/*
Plugin Name: WP React Quiz App
Author: Ahsan Shaheen
Version: 1.0
*/

use WPRQA\Includes\Menu;

final class WP_React_Quiz_App
{
    private static $instance = null;

    private function __construct()
    {
    }

    public static function instance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
            self::$instance->define_constants();
            self::$instance->includes();
            self::$instance->dependency_class_instance();
        }

        return self::$instance;
    }

    public function dependency_class_instance()
    {
        Menu::instance();
    }

    public function includes()
    {
        include WPRQA_PLUGIN_FILE . 'vendor/autoload.php';
    }

    public function define_constants()
    {
        define('WPRQA_PLUGIN_FILE', plugin_dir_path(__FILE__));
        define('WPRQA_PLUGIN_DIST_FILE_PATH', plugin_dir_path(__FILE__) . 'assets/dist');
        define('WPRQA_PLUGIN_DIST_FILE_URL', plugin_dir_url(__FILE__) . 'assets/dist');
    }
}

function wp_react_quiz_app()
{
    return WP_React_Quiz_App::instance();
}

wp_react_quiz_app();
