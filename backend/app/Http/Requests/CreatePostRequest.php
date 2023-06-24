<?php

namespace App\Http\Requests;

use App\Models\Upload;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreatePostRequest extends FormRequest
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
            'file' => 'required|mimes:jpg,png,,mp3,mp4|max:5000',
            'type' => ['required', Rule::in(Upload::TYPES)],
            'content' => 'string|nullable',
        ];
    }
}
