<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class JournalController extends Controller
{
    public function index()
    {
        return inertia('journal/index');
    }

    public function show(string $id)
    {
        return inertia('journal/show', ['id' => $id]);
    }
}
