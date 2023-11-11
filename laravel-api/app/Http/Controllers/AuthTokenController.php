<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthTokenController extends Controller
{
    /**
     * Creates a new authentication token for a given
     * user if their login credentials are accurate
     * @param Request $request
     * @return array
     * @throws ValidationException
     */
    public function store(Request $request): array
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return ['user' => new UserResource($user), 'token' => $user->createToken($request->device_name)->plainTextToken];
    }

    /**
     * Deletes all authentication tokens for a given user,
     * essentially logging them out of the API on all devices
     * @param Request $request
     * @return void
     */
    public function destroy(Request $request): void
    {
        $request->user()->tokens()->delete();
    }
}
