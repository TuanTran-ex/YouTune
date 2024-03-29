<?php

namespace App\Providers;

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Register Marco
        Response::macro('apiSuccess', function ($data, $meta = []) {
            if (is_null($data)) {
                $statusCode = HttpResponse::HTTP_NO_CONTENT;
            } else {
                $statusCode = HttpResponse::HTTP_OK;
                if ($data instanceof \Illuminate\Pagination\LengthAwarePaginator) {
                    $meta = array_merge($meta, [
                        'total' => $data->total(),
                        'per_page' => $data->perPage(),
                        'current_page' => $data->currentPage(),
                        'last_page' => $data->lastPage(),
                        'next_page_url' => $data->nextPageUrl(),
                        'prev_page_url' => $data->previousPageUrl(),
                        'from' => $data->firstItem(),
                        'to' => $data->lastItem(),
                    ]);
                    $data = $data->items();
                }
            }

            return response()->json([
                'status' => true,
                'data' => $data,
                'meta' => $meta,
            ], $statusCode);
        });

        Response::macro('apiError', function ($message, $errors = [], $httpCode = HttpResponse::HTTP_BAD_REQUEST, $code = null) {
            if (empty($errors)) {
                $errors = $message;
            }

            return response()->json([
                'status' => false,
                'message' => $message,
                'errors' => $errors,
                'code' => $code,
            ])->setStatusCode($httpCode);
        });
    }
}
