<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Collection;

class UserService {
    protected $users;

    public function __construct(User $users)
    {
        $this->users = $users;
    }

    public function createUser($data): User
    {
        $newUser = $this->users->create($data);
        return $newUser;
    }

    public function getProfile(): Collection
    {
        $user = auth()->user();
        $user = $user->with(['upload', 'address.ward.city'])->get();
        return $user;
    }
}
