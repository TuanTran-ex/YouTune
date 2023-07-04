<?php

namespace App\Services;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
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

    public function create($data, $file): PostResource
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
    public function update($id, $data): PostResource
    {
        try {
            $post = $this->getIfOwner($id);
            $post->content = $data['content'];
            $post->save();
            return new PostResource($post);
        } catch (\Throwable $th) {
            logger($th);
            throw $th;
        }
    }
    public function delete($id): void
    {
        try {
            $post = $this->getIfOwner($id);
            $this->uploadService->deleteDumpFile($post);
            $post->delete();
        } catch (\Throwable $th) {
            logger($th);
            throw $th;
        }
    }
    public function getIfOwner($id)
    {
        $post = $this->post->findOrFail($id);
        $owner = $post->getOwner();
        if (auth()->user()->id !== $owner->id) {
            throw new AuthorizationException();
        }
        return $post;
    }
}
