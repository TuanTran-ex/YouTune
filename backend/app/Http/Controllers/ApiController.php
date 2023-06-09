<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ApiController extends Controller
{
    public function resSuccess(
        $data,
    ): JsonResponse {
        return response()->apiSuccess($data);
    }

    public function resCreated($data): JsonResponse
    {
        return $this->resSuccess($data);
    }

    public function resNoContent(): JsonResponse
    {
        return $this->resSuccess(null);
    }

    public function resError(
        $message,
        $statusCode = Response::HTTP_BAD_REQUEST,
        $errors = []
    ): JsonResponse {
        return response()->apiError(
            $message,
            $errors,
            $statusCode
        );
    }

    public function resUnauthorized($message = 'unauthenticated'): JsonResponse
    {
        return $this->resError($message, Response::HTTP_UNAUTHORIZED);
    }

    public function resForbidden($message = 'unauthorized'): JsonResponse
    {
        return $this->resError($message, Response::HTTP_FORBIDDEN);
    }

    public function resNotFound($modelNotFound, $message = 'validation_error'): JsonResponse
    {
        $errors = [$modelNotFound => ['message' => 'not_found', 'attribute' => $modelNotFound]];

        return $this->resError($message, Response::HTTP_NOT_FOUND, $errors);
    }

    public function resInternalError($message = 'internal_server_error'): JsonResponse
    {
        return $this->resError($message, Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function resUnprocessable($message, $errors): JsonResponse
    {
        return $this->resError($message, Response::HTTP_UNPROCESSABLE_ENTITY, $errors);
    }
}
