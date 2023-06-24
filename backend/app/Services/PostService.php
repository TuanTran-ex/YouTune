<?php

namespace App\Services;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PostService
{
    protected $post;
    protected $uploadService;

    public function __construct(Post $post, UploadService $uploadService)
    {
        $this->post = $post;
        $this->uploadService = $uploadService;
    }

    public function create($data, $file)
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $newPost = $this->post->create($data);
            $newPost->users()->attach($user->id, ['type' => User::USER_POST_TYPES['owner']]);
            $uploadData = [
                'id' => $newPost->id,
                'model' => Post::class,
                'type' => $data['type']
            ];
            $this->uploadService->uploadFile($uploadData, $file);
            DB::commit();
            return new PostResource(
                $newPost->with(['upload', 'usersWithPivot'])->findOrFail($newPost->id)
            );
        } catch (\Throwable $th) {
            DB::rollBack();
            logger($th);
            throw $th;
        }
    }
}