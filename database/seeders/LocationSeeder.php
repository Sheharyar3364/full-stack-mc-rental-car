<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Los Angeles International Airport',
                'address' => '1 World Way',
                'city' => 'Los Angeles',
                'state' => 'CA',
                'postal_code' => '90045',
                'country' => 'USA',
                'phone' => '+1 (310) 646-5252',
                'email' => 'lax@mcrentalcars.com',
                'opening_hours' => [
                    'monday' => '00:00-23:59',
                    'tuesday' => '00:00-23:59',
                    'wednesday' => '00:00-23:59',
                    'thursday' => '00:00-23:59',
                    'friday' => '00:00-23:59',
                    'saturday' => '00:00-23:59',
                    'sunday' => '00:00-23:59',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Beverly Hills Downtown',
                'address' => '9500 Wilshire Blvd',
                'city' => 'Beverly Hills',
                'state' => 'CA',
                'postal_code' => '90212',
                'country' => 'USA',
                'phone' => '+1 (310) 274-3481',
                'email' => 'beverlyhills@mcrentalcars.com',
                'opening_hours' => [
                    'monday' => '08:00-20:00',
                    'tuesday' => '08:00-20:00',
                    'wednesday' => '08:00-20:00',
                    'thursday' => '08:00-20:00',
                    'friday' => '08:00-21:00',
                    'saturday' => '09:00-19:00',
                    'sunday' => '10:00-17:00',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Miami International Airport',
                'address' => '2100 NW 42nd Ave',
                'city' => 'Miami',
                'state' => 'FL',
                'postal_code' => '33142',
                'country' => 'USA',
                'phone' => '+1 (305) 876-7000',
                'email' => 'miami@mcrentalcars.com',
                'opening_hours' => [
                    'monday' => '00:00-23:59',
                    'tuesday' => '00:00-23:59',
                    'wednesday' => '00:00-23:59',
                    'thursday' => '00:00-23:59',
                    'friday' => '00:00-23:59',
                    'saturday' => '00:00-23:59',
                    'sunday' => '00:00-23:59',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'New York JFK Airport',
                'address' => 'JFK Access Rd',
                'city' => 'Queens',
                'state' => 'NY',
                'postal_code' => '11430',
                'country' => 'USA',
                'phone' => '+1 (718) 244-4444',
                'email' => 'jfk@mcrentalcars.com',
                'opening_hours' => [
                    'monday' => '00:00-23:59',
                    'tuesday' => '00:00-23:59',
                    'wednesday' => '00:00-23:59',
                    'thursday' => '00:00-23:59',
                    'friday' => '00:00-23:59',
                    'saturday' => '00:00-23:59',
                    'sunday' => '00:00-23:59',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Las Vegas Strip',
                'address' => '3799 S Las Vegas Blvd',
                'city' => 'Las Vegas',
                'state' => 'NV',
                'postal_code' => '89109',
                'country' => 'USA',
                'phone' => '+1 (702) 731-3311',
                'email' => 'vegas@mcrentalcars.com',
                'opening_hours' => [
                    'monday' => '00:00-23:59',
                    'tuesday' => '00:00-23:59',
                    'wednesday' => '00:00-23:59',
                    'thursday' => '00:00-23:59',
                    'friday' => '00:00-23:59',
                    'saturday' => '00:00-23:59',
                    'sunday' => '00:00-23:59',
                ],
                'is_active' => true,
            ],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
