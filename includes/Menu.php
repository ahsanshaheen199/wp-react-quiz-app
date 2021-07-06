<?php

namespace WPRQA\Includes;

class Menu
{
    private static $instance = null;

    private function __construct()
    {
        add_action('admin_menu', [$this, 'adminMenu']);
        add_action('admin_enqueue_scripts', [$this, 'adminAssets']);

        add_action('wp_enqueue_scripts', [$this, 'frontendAssets']);
        add_shortcode('wprqa_frontend', [$this, 'wprqa_frontend_shortcode']);
    }

    public static function instance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function adminMenu()
    {
        add_menu_page(
            __('Quiz App', 'wprqa'),
            __('Quiz App', 'wprqa'),
            'manage_options',
            'wprqa',
            [$this, 'adminMenuHtml']
        );
    }

    public function adminMenuHtml()
    {
?>
        <div id="wprqa"></div>
<?php }

    public function adminAssets($hook)
    {
        $assetBuildPath = include(WPRQA_PLUGIN_DIST_FILE_PATH . '/index.asset.php');
        if ($hook === 'toplevel_page_wprqa') {
            wp_enqueue_script('wprqa-admin', WPRQA_PLUGIN_DIST_FILE_URL . '/index.js', $assetBuildPath['dependencies'], $assetBuildPath['version'], true);

            // wp_localize_script('wprcb-admin', 'wprcbData', [
            //     'nonce' => wp_create_nonce('wp_rest'),
            //     'apiUrl' => rest_url()
            // ]);

            wp_enqueue_style('wprqa-admin', WPRQA_PLUGIN_DIST_FILE_URL . '/index.css');
        }
    }

    public function frontendAssets()
    {
        $assetBuildPath = include(WPRQA_PLUGIN_DIST_FILE_PATH . '/frontend/frontend.asset.php');
        wp_enqueue_script('wprqa-frontend', WPRQA_PLUGIN_DIST_FILE_URL . '/frontend/frontend.js', $assetBuildPath['dependencies'], $assetBuildPath['version'], true);
    }

    public function wprqa_frontend_shortcode($atts)
    {
        ob_start();

        echo '<div id="mainwrap"></div>';

        return ob_get_clean();
    }
}
