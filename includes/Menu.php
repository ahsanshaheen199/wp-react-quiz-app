<?php

namespace WPRQA\Includes;

class Menu
{
    private static $instance = null;

    private function __construct()
    {
        add_action('admin_menu', [$this, 'adminMenu']);
        add_action('admin_enqueue_scripts', [$this, 'adminAssets']);
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
            'WPRQA',
            'WPRQA',
            'manage_options',
            'wprqa',
            [$this, 'adminMenuHtml']
        );
    }

    public function adminMenuHtml()
    {
?>
        <div class="wrap">
            <div id="root"></div>
        </div>
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
}
