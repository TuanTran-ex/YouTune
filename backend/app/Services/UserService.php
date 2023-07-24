<?php

namespace App\Services;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $users;

    public function __construct(User $users)
    {
        $this->users = $users;
    }

    public function create($data): User
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

    public function getProfileWithPosts()
    {
        $user = auth()->user();
        $user = $user->with(
            [
                'upload', 'address.ward.city',
                'postsOrderByDescCreatedTime.uploads',
                'friends',
            ],
        )
            ->findOrFail($user->id);

        return new UserResource($user);
    }

    public function updateProfile($data): UserResource
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $user->update($data);
            if (! empty($data['address']) && ! empty($data['m_ward_id'])) {
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

            return new UserResource(
                $user->with(['upload', 'address.ward.city'])->findOrFail($user->id)
            );
        } catch (\Throwable $th) {
            DB::rollBack();
            logger($th);
            throw $th;
        }
    }

    public function changePassword($data)
    {
        ['old_password' => $oldPassword, 'new_password' => $newPassword] = $data;
        try {
            $user = auth()->user();
            if (! Hash::check($oldPassword, $user->getAuthPassword())) {
                throw new AuthenticationException();
            }
            $user->password = $newPassword;
            $user->save();

            return new UserResource($user);
        } catch (\Throwable $th) {
            logger($th);
            throw $th;
        }
    }

    public function getListUser($searchKey, $pageSize)
    {
        $users = $this->users;
        if (!empty($searchKey)) {
            $users = $users->search($searchKey);
        }
        $users = $users->paginate($pageSize)->load(['address.ward.city', 'upload']);
        return new UserCollection($users);
    }
}
