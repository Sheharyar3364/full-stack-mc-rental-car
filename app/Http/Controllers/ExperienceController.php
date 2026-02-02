<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return inertia('experiences/index');
    }

    public function show(string $id)
    {
        return inertia('experiences/show', ['id' => $id]);
    }
}
