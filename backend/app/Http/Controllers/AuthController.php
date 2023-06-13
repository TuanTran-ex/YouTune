<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class AuthController extends ApiController
{
    protected $userService;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();
            if (! $token = auth()->attempt($credentials)) {
                return $this->resUnauthorized();
            }
            $data = [
                'user' => auth()->user(),
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
            ];

            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user = $this->userService->createUser($request->validated());
            return $this->resSuccess($user);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError($th->getMessage());
        }
    }

    public function getProfile(): JsonResponse
    {
        $user = $this->userService->getProfile();
        return $this->resSuccess($user);
    }
}
