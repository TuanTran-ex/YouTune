<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadFileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'model' => 'required|string|max:50',
            'file' => 'required|mimes:jpg,png,,mp3,mp4|max:5000',
            'id' => 'required|numeric',
            'name' => 'string|max:50',
        ];
    }
}
