<?php

namespace App\Services;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Str;

class ValidatorService
{
    /** @var Validator  */
    protected $validator;
    protected $failedRules = [];
    protected $errors = [];
    public function __construct(Validator $validator, $errors = [])
    {
        $this->validator = $validator;
        $this->errors = $errors;
    }

    public function setErrors($errors)
    {
        $this->errors = $errors;
    }

    public function messages()
    {
        $errors = $this->errors;
        array_walk($errors, function (&$item, $field) {
            $rule = $this->getRule($field);
            $item = [
                'message' => $item[0],
                'attribute' => $field
            ];

            $params = [];
            switch ($rule) {
                case 'between':
                    $params = [
                        'min' => $this->getRuleParams($field)[0],
                        'max' => $this->getRuleParams($field)[1],
                    ];
                    break;
                case 'min':
                    $params = [
                        'min' => $this->getRuleParams($field)[0],
                    ];
                    break;
                case 'max':
                    $params = [
                        'max' => $this->getRuleParams($field)[0],
                    ];
                    break;
                case 'mimes':
                    $params = [
                        'types' => $this->getRuleParams($field)
                    ];
                    break;
                case 'in':
                    $params = [
                        'in' => $this->getRuleParams($field)
                    ];
                    break;
            }

            if (!empty($params)) {
                $item = array_merge($item, [
                    'args' => $params,
                ]);
            }
        });

        return $errors;
    }

    protected function getRule($field)
    {
        $rule = $this->getFailedRules()[$field] ?? [];
        $rawName = array_key_first($rule);

        if (empty($rawName)) {
            return '';
        }
        return Str::snake($rawName);
    }

    protected function getRuleParams($field)
    {
        $rule = $this->getFailedRules()[$field] ?? [];
        $rawName = array_key_first($rule);

        if (empty($rawName)) {
            return [];
        }
        return $rule[$rawName];
    }

    protected function getFailedRules(): array
    {
        if (empty($this->failedRules)) {
            $this->failedRules = $this->validator->failed();
        }
        return $this->failedRules;
    }
}
