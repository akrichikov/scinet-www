import { saveUserToLocalStorage } from '@/common/lib/api/api';
import { saveTokenToCache } from '@/common/lib/resources/SecureTokenHandler';
import userProfile from '@/common/lib/UserProfile';

interface Avatar {
    name: string;
    desc: string;
    company_name: string;
    project_name: string;
    company_slogan: string[];
    avatar_idle: MediaElement;
    avatar_speaking: MediaElement;
    description: string;
    purpose: string;
    skills: string[];
}

interface MediaElement {
    element_id: string;
    vid_src: string;
}

interface GoogleSignIn {
    data_client_id: string;
    data_login_uri: string;
}

interface Theme {
    primary_color: string;
    secondary_color: string;
    text_font_color: string;
    text_font_background: string;
}

interface Site {
    theme: Theme;
    primary_background_video: string;
    secondary_background_video: string | null;
    foot_text: string;
}

interface AdvisiumConfig {
    avatar: Avatar;
    google_sign_in: GoogleSignIn;
    site: Site;
}

interface DecodedGmailProfile {
    email_verified: boolean;
    given_name: string;
    family_name: string;
    name: string;
    email: string;
    sub: string;
    picture: string;
}

interface UserProfile {
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    profile_id: string;
    imageurl: string;
    name: string;
    username: string;
    hashed_password: string;
    timezone: string;
    locale: string;
    language: string;
    last_login: string;
    app_id: string;
}

interface GoogleCredentialResponse {
    credential?: string;
    select_by?: string;
    // Add other potential fields if needed
}

interface BackendVerifyResponse {
    success: boolean;
    user?: any; // Define a proper user type/interface later
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string;
}

class GoogleSignInHandler {
    private companyName: string;
    private profileConfig: AdvisiumConfig | null = null;

    constructor(companyName: string = 'Advisium') {
        this.companyName = companyName;
        this.initializeProfileConfig();
    }

    private initializeProfileConfig(): void {
        this.profileConfig = {
            avatar: {
              name: "Sam",
              desc: "Hi, I'm Sam — You expert in all things strategic.",
              company_name: "Advisium",
              project_name: "advisium",
              company_slogan: [
                "Your World on Auto Pilot",
                "Autonomous Control System"
              ],
              avatar_idle: {
                element_id: "id_avatar_idle",
                vid_src: "/media/advisium/celia_animated-no-back.mp4"
              },
              avatar_speaking: {
                element_id: "id_avatar_speaking",
                vid_src: "/media/advisium/CELIA_INTRO-no-back.mp4"
              },
              description: "",
              purpose: "",
              skills: ["", ""]
            },
            google_sign_in: {
              data_client_id: "956030032729-kn5ffaucva2ihk6b2mnrbpm20g6nhlju.apps.googleusercontent.com",
              data_login_uri: "/api/login"
            },
            site: {
              theme: {
                primary_color: "#a20101",
                secondary_color: "#223b54",
                text_font_color: "var(--color-neutral-0)",
                text_font_background: "var(--color-neutral-1000)"
              },
              primary_background_video: "/media/advisium/servers.mp4",
              secondary_background_video: null,
              foot_text: ""
            }
        };
    }

    static async handleCredentialResponse(response: GoogleCredentialResponse): Promise<void> {
        console.log("[GoogleSignInHandler] Received credential response:", response);

        if (!response.credential) {
            console.error("[GoogleSignInHandler] No credential received from Google.");
            // TODO: Show error message to the user on the sign-in page
            return;
        }

        try {
            // Send the Google ID token to your backend for verification
            const backendResponse = await fetch('/api/auth/google/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential: response.credential }),
                credentials: 'include', // Include cookies if needed for backend session management
            });

            const result: BackendVerifyResponse = await backendResponse.json();

            if (backendResponse.ok && result.success && result.user && result.refreshToken) {
                console.log("[GoogleSignInHandler] Backend verification successful:", result);

                // 1. Save the refresh token (refreshToken) from your backend
                saveTokenToCache(result.refreshToken);
                console.log("[GoogleSignInHandler] Refresh token saved.");

                // 2. Save user info (optional, could be fetched later using token)
                userProfile.setUserInfo(result.user);
                // Optionally save to localStorage too if needed elsewhere immediately
                // await saveUserToLocalStorage(result.user); 
                console.log("[GoogleSignInHandler] User info saved.");

                // 3. Redirect to the workspace
                console.log("[GoogleSignInHandler] Redirecting to /workspace...");
                window.location.href = '/workspace';

            } else {
                console.error("[GoogleSignInHandler] Backend verification failed:", result.error || backendResponse.statusText);
                // TODO: Show error message to the user on the sign-in page
                // Example: update userMessageLabel in SignInPage
                const userMessageLabel = document.getElementById('userMessageLabelId'); // Need to add an ID
                if (userMessageLabel) {
                    userMessageLabel.style.opacity = '1';
                    userMessageLabel.style.color = 'var(--color-error)';
                    userMessageLabel.textContent = `Google Sign-In Failed: ${result.error || 'Backend verification issue'}`;
                }
            }
        } catch (error) {
            console.error("[GoogleSignInHandler] Error sending credential to backend:", error);
            // TODO: Show error message to the user on the sign-in page
            const userMessageLabel = document.getElementById('userMessageLabelId'); // Need to add an ID
            if (userMessageLabel) {
                userMessageLabel.style.opacity = '1';
                userMessageLabel.style.color = 'var(--color-error)';
                userMessageLabel.textContent = 'An error occurred during sign-in.';
            }
        }
    }
}

export default GoogleSignInHandler;