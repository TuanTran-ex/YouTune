<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FileUploadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name ?? null,
            'url' => generate_file_url($this),
            'image' => $this->image ?? null,
            'uploadable_id' => $this->uploadable_id,
            'uploadable_type' => $this->uploadable_type,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at ,
        ];
    }
}
