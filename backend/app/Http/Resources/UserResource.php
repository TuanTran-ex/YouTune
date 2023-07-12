<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            ...parent::toArray($request),
            'upload' => new FileUploadResource($this->upload),
            'posts' => array_key_exists(
                'posts_order_by_desc_created_time',
                parent::toArray($request)
            ) ? new PostCollection($this->postsOrderByDescCreatedTime) : [],
        ];
        unset($data['posts_order_by_desc_created_time']);
        return $data;
    }
}
