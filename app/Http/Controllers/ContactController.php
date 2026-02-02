<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display the contact page.
     */
    public function index(): Response
    {
        return Inertia::render('contact');
    }

    /**
     * Handle the contact form submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        // Send email notification to admin
        try {
            \Mail::to(config('mail.contact_email', env('CONTACT_EMAIL')))
                ->send(new \App\Mail\ContactFormMail($validated));
        } catch (\Exception $e) {
            \Log::error('Failed to send contact form email: ' . $e->getMessage());
        }

        return back()->with('success', 'Thank you for contacting us! We will get back to you soon.');
    }
}
