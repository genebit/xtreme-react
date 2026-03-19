<?php

namespace App\Http\Controllers\v1\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render('Demo/Reports/ReportsPage');
    }

    public function export()
    {
        return Inertia::render('Demo/Reports/ReportsExportPage');
    }
}
