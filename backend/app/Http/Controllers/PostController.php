<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;

class PostController extends ApiController
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function store(CreatePostRequest $request): JsonResponse
    {
        $newPost = $this->postService->create(
            $request->validated(),
            $request->file('files')
        );
        return $this->resSuccess($newPost);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    public function update(UpdatePostRequest $request, $id): JsonResponse
    {
        $data = $request->validated();
        $updatedPost = $this->postService->update($id, $data);
        return $this->resSuccess($updatedPost);
    }

    public function destroy($id): JsonResponse
    {
        $this->postService->delete($id);
        return $this->resNoContent();
    }
}
