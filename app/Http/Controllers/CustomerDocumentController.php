<?php

namespace App\Http\Controllers;

use App\Models\CustomerDocument;
use Illuminate\Http\Request;
use Filament\Actions\Action;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CustomerDocumentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user->customer) {
            // Handle case where user is not linked to a customer record
            // For now, assume they are, or create one?
            // Ideally the user model handles this.
            // Let's assume user->customer relationship exists.
            // If not, we might need to redirect or show empty.
        }

        $documents = $user->customer ? $user->customer->documents()->latest()->get() : [];

        // Return a view with documents
        // For now, we'll likely add this to the account dashboard context or a separate page
        return Inertia::render('account/verification/index', [
            'documents' => $documents,
            'requirements' => [
                ['type' => 'license_front', 'label' => 'Driver License (Front)', 'required' => true],
                ['type' => 'license_back', 'label' => 'Driver License (Back)', 'required' => true],
                ['type' => 'passport', 'label' => 'Passport / ID', 'required' => true],
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:license_front,license_back,passport,id_card_front,id_card_back,proof_of_address',
            'file' => 'required|file|mimes:jpeg,png,pdf|max:5120', // 5MB max
        ]);

        $user = $request->user();

        // Ensure user has a customer record
        $customer = $user->customer;

        if (!$customer) {
            // Check if a customer exists with this email (from before account linking)
            $existingCustomer = \App\Models\Customer::where('email', $user->email)->first();

            if ($existingCustomer) {
                // Link the existing customer to this user
                $existingCustomer->update(['user_id' => $user->id]);
                $customer = $existingCustomer;
            } else {
                // Create new customer record
                $customer = \App\Models\Customer::create([
                    'user_id' => $user->id,
                    'first_name' => explode(' ', $user->name)[0],
                    'last_name' => explode(' ', $user->name, 2)[1] ?? '',
                    'email' => $user->email,
                ]);
            }
        }

        $file = $request->file('file');
        $path = $file->store('customer-uploads', 'secure_documents');

        $customer->documents()->create([
            'type' => $request->type,
            'path' => $path,
            'original_filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'status' => 'pending',
        ]);

        // Update customer status to pending if not already verified
        if ($customer->verification_status !== 'verified') {
            $customer->update(['verification_status' => 'pending']);
        }

        // Notify Admins
        try {
            $admins = \App\Models\User::all(); // Notify all users as they act as admins currently

            foreach ($admins as $admin) {
                \Filament\Notifications\Notification::make()
                    ->title('New Document Uploaded')
                    ->body("{$customer->first_name} {$customer->last_name} has uploaded a new document.")
                    ->actions([
                        Action::make('review')
                            ->button()
                            ->url("/admin/customers/{$customer->id}/edit"),
                    ])
                    ->sendToDatabase($admin);
            }
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error('Failed to send admin notification: ' . $e->getMessage());
        }

        return back()->with('success', 'Document uploaded successfully and is pending verification.');
    }
}
