<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FormsController extends Controller
{
    public function index()
    {
        return Inertia::render('Authenticated/Forms/FormsPage');
    }
}
