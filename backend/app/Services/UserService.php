<?php

namespace App\Services;
use App\Models\User;

class UserService {
    protected $users;

    public function __construct(User $users)
    {
        $this->users = $users;
    }

    public function createUser($data)
    {
        $newUser = $this->users->create($data);
        return $newUser;
    }
}
