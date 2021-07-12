<?php

namespace WPRQA\Includes\Database;

class Quiz
{
    private static $instance = null;
    public function __construct()
    {
        register_activation_hook(WPRQA_PLUGIN_URL, [$this, 'createQuizTable']);
    }

    public static function instance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function createQuizTable()
    {
        error_log('yes');
        global $wpdb;
        $tableName = $wpdb->prefix . 'wprqa_quizzes';
        $charset_collate = $wpdb->get_charset_collate();

        if ($wpdb->get_var("SHOW TABLES LIKE '$tableName'") != $tableName) {
            $sql = "CREATE TABLE $tableName ( 
              `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
              `quiz_title` VARCHAR(100) NOT NULL , 
              `question_data` LONGTEXT NOT NULL ,
              `created_by` BIGINT(20) UNSIGNED NOT NULL ,
              `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
              `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              PRIMARY KEY (`id`) 
          )  $charset_collate";

            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
            dbDelta($sql);
        }
    }
}
