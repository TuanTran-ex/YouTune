<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get('database/data/city.json');
        $data = json_decode($json, true);
        try {
            foreach ($data as $value) {
                City::create([
                        'id' => $value['id'],
                        'name' => $value['name']
                    ]
                );
            }
        } catch (\Exception $e) {
            logger($e->getMessage());
        }
    }
}
