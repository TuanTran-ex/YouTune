<?php

namespace App\Exceptions;

use App\Services\ValidatorService;
use App\Utils\StringUtil;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

/**
 * Summary of Handler
 */
class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception): JsonResponse
    {
        if ($exception instanceof HttpException) {
            $httpCode = $exception->getStatusCode();
            $message = $exception->getMessage() ?: 'http_error_'.$httpCode;

            return response()->apiError($message, 'http_error_'.$httpCode, $httpCode);
        }
        if ($exception instanceof AuthenticationException) {
            return response()->apiError('unauthenticated', 'unauthenticated', Response::HTTP_UNAUTHORIZED);
        }
        if ($exception instanceof AuthorizationException) {
            return response()->apiError('unauthorized', 'unauthorized', Response::HTTP_UNAUTHORIZED);
        }
        if ($exception instanceof ValidationException) {
            /** @var ValidatorService $validator */
            $validator = app(ValidatorService::class, ['validator' => $exception->validator]);
            $validator->setErrors($exception->errors());

            return response()->apiError(
                'validation_error',
                $validator->messages(),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }
        if ($exception instanceof ModelNotFoundException) {
            $attribute = StringUtil::getModelFromModelClassName($exception->getModel());

            return response()->apiError(
                'validation_error',
                [$attribute => ['message' => 'not_found', 'attribute' => $attribute]],
                Response::HTTP_NOT_FOUND
            );
        }

        return response()->apiError(
            'internal_server_error',
            'internal_server_error',
            Response::HTTP_INTERNAL_SERVER_ERROR
        );
    }
}
