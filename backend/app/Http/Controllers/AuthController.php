<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

    private function getUserWithToken($token)
    {
        return [
            'user' => auth()->user(),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ];
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
            if (!$token = auth()->attempt($credentials)) {
                return $this->resUnauthorized();
            }

            return $this->resSuccess($this->getUserWithToken($token));
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

    public function refresh(): JsonResponse
    {
        try {
            $token = auth()->refresh();
            return $this->resSuccess($this->getUserWithToken($token));
        } catch (\Throwable $th) {
            logger($th);
            throw $th;
        }
    }
    public function logout()
    {
        auth()->logout();
        return $this->resSuccess(null);
    }
    public function getProfile(Request $request): JsonResponse
    {
        $user = !empty($request->query('full-data')) ?
            $this->userService->getProfileWithPosts() :
            $this->userService->getProfile();
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
