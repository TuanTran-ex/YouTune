<?php

namespace App\Services;

use App\Models\City;
use Illuminate\Database\Eloquent\Collection;

class CityService
{
    protected $city;
    public function __construct(City $city)
    {
        $this->city = $city;
    }

    public function listCity(): Collection
    {
        return $this->city->all();
    }

    public function getCity($id): City
    {
        return $this->city->with('wards')->findOrFail($id);
    }
}
