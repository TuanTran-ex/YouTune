<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateProfileRequest;
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
            $user = $this->userService->create($request->validated());
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

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        try {
            $user = $this->userService->updateProfile($request->validated());
            return $this->resSuccess($user);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError($th->getMessage());
        }
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        try {
            $user = $this->userService->changePassword($request->validated());
            return $this->resSuccess($user);
        } catch (\Throwable $th) {
            logger($th);
            throw $th;
        }
    }
}
