<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    /**
     * Subscribe to newsletter.
     */
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // TODO: Implement newsletter subscription logic
        // Options:
        // 1. Store in database (create newsletter_subscribers table)
        // 2. Integrate with Mailchimp/SendGrid/ConvertKit
        // 3. Send to admin email for manual processing

        // For now, log it
        \Log::info('Newsletter subscription:', ['email' => $request->email]);

        return back()->with('success', 'Thank you for subscribing to our newsletter!');
    }
}
