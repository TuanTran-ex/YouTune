<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserService
{
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

    public function getProfile(): UserResource
    {
        $user = auth()->user();
        $user = $user->with(['upload', 'address.ward.city'])->findOrFail($user->id);
        return new UserResource($user);
    }

    public function updateProfile($data): UserResource
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $user->update($data);
            if (!empty($data['address']) && !empty($data['m_ward_id'])) {
                $addressData = [
                    'lat' => 0,
                    'long' => 0,
                    'address' => $data['address'],
                    'm_ward_id' => $data['m_ward_id'],
                ];
                $user->address()->updateOrCreate(
                    ['addressable_id' => $user->id, 'addressable_type' => User::class],
                    $addressData
                );
            }
            DB::commit();
            return new UserResource($user->with(['upload', 'address.ward.city'])->findOrFail($user->id));
        } catch (\Throwable $th) {
            DB::rollBack();
            logger($th);
            throw $th;
        }
    }
}
