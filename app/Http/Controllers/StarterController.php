<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StarterController extends Controller
{
    public function index()
    {
        return Inertia::render('Authenticated/Starter/StarterPage');
    }
}
