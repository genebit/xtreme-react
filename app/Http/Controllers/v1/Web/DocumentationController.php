<?php

namespace App\Http\Controllers\v1\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DocumentationController extends Controller
{
    public function index()
    {
        return Inertia::render('Guest/LandingPage');
    }
}
