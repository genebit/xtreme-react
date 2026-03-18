<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render('Authenticated/Reports/ReportsPage');
    }

    public function export()
    {
        return Inertia::render('Authenticated/Reports/ReportsExportPage');
    }
}
