<?php

namespace App\Http\Controllers\v1\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class FormsController extends Controller
{
    public function index()
    {
        return Inertia::render('UI/Forms/FormsPage');
    }
}
