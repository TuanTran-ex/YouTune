<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class AuthController extends ApiController
{
    protected $users;
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(User $users)
    {
        $this->users = $users;
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
            $data = [
                // 'user' => $this->users->where('email', $credentials['email'])->first(),
                'user' => auth()->user(),
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ];
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            throw $th;
        }
    }

    public function register(RegisterRequest $request)
    {
        try {
            $user = $this->users->create($request->validated());
            return $this->resSuccess($user);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError($th->getMessage());
        }
    }
}
