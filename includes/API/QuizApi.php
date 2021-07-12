<?php

namespace WPRQA\Includes\API;

use WP_REST_Controller;
use WP_REST_Server;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WeDevs\ORM\Eloquent\Facades\DB;

class QuizApi extends WP_REST_Controller
{
    private static $instance = null;
    public function __construct()
    {
        $this->namespace     = 'wprqa/v1';
        $this->rest_base     = 'quizzes';
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public static function instance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function registerRoutes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                // [
                //     'methods'             => WP_REST_Server::READABLE,
                //     'callback'            => [$this, 'index'],
                //     'permission_callback' => [$this, 'permissionCheck']
                // ],
                [
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'store'],
                    'permission_callback' => [$this, 'permissionCheck']
                ],

            ]
        );

        // register_rest_route($this->namespace, '/contact/(?P<id>[\d]+)', [
        //     [
        //         'methods'   => WP_REST_Server::READABLE,
        //         'callback'  => [$this, 'show'],
        //         'permission_callback' => [$this, 'permissionCheck'],
        //     ],
        //     [
        //         'methods'   => 'PUT, PATCH',
        //         'callback'  => [$this, 'update'],
        //         'permission_callback' => [$this, 'permissionCheck'],
        //     ],
        //     [
        //         'methods'   => WP_REST_Server::DELETABLE,
        //         'callback'  => [$this, 'destroy'],
        //         'permission_callback' => [$this, 'permissionCheck'],
        //     ],
        // ]);
    }

    public function store(WP_REST_Request $request)
    {
        $data = json_decode($request->get_body());
        $id = DB::table('wprqa_quizzes')->insertGetId(
            [
                'quiz_title'        => $data->quizTitle,
                'question_data'     => json_encode($data->questions),
                'created_by'        => is_user_logged_in() ? get_current_user_id() : 0,
            ]
        );

        if (!$id) {
            return new WP_REST_Response(['message'  => __('Can\'t create quiz', 'wprqa')], 404);
        }

        return new WP_REST_Response(['message' => __('Quiz created', 'wprqa')]);
    }

    public function permissionCheck()
    {
        if (!current_user_can('manage_options')) {
            return new WP_Error(
                'rest_forbidden',
                __('Sorry, you are not allowed'),
                array('status' => rest_authorization_required_code())
            );
        }

        return true;
    }
}
