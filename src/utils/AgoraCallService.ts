import AgoraRTC from "agora-rtc-sdk-ng";
import type { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";

export class AgoraCallService {
    private static instance: AgoraCallService;
    private client: IAgoraRTCClient | null = null;
    private localAudioTrack: IMicrophoneAudioTrack | null = null;
    private appId: string = "";
    private isJoining: boolean = false;

    private constructor() { }

    public static getInstance(): AgoraCallService {
        if (!AgoraCallService.instance) {
            AgoraCallService.instance = new AgoraCallService();
        }
        return AgoraCallService.instance;
    }

    public async init(appId: string) {
        this.appId = appId;
        if (!this.client) {
            this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        }
    }

    public async join(channelName: string, token: string | null, uid: number): Promise<boolean> {
        if (!this.client) return false;
        
        // Prevent multiple join attempts
        if (this.isJoining || this.client.connectionState !== "DISCONNECTED") {
            console.log("Agora: Already joined or joining. State:", this.client.connectionState);
            return true; 
        }

        this.isJoining = true;

        try {
            // Setup listeners BEFORE joining
            this.client.removeAllListeners();
            this.client.on("user-published", async (user, mediaType) => {
                console.log("Remote user published:", user.uid, mediaType);
                await this.client?.subscribe(user, mediaType);
                if (mediaType === "audio") {
                    console.log("Playing remote audio...");
                    user.audioTrack?.play();
                }
            });

            console.log("Joining Agora channel:", channelName);
            await this.client.join(this.appId, channelName, token, uid);
            
            console.log("Agora: Joined successfully. State:", this.client.connectionState);

            // Check if we are still connected before creating/publishing tracks
            if (this.client.connectionState === "CONNECTED") {
                if (!this.localAudioTrack) {
                    this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                }
                
                // Final check before publishing
                if (this.client.connectionState === "CONNECTED") {
                    await this.client.publish([this.localAudioTrack]);
                    console.log("Local audio published");
                } else {
                    console.warn("Agora: Connection state changed before publishing:", this.client.connectionState);
                }
            }

            this.isJoining = false;
            return true;
        } catch (error) {
            console.error("Agora Join Error:", error);
            this.isJoining = false;
            return false;
        }
    }

    public async leave() {
        try {
            if (this.localAudioTrack) {
                this.localAudioTrack.stop();
                this.localAudioTrack.close();
                this.localAudioTrack = null;
            }
            if (this.client && this.client.connectionState !== "DISCONNECTED") {
                await this.client.leave();
            }
            this.isJoining = false;
        } catch (e) {
            console.error("Agora Leave Error:", e);
        }
    }

    public async toggleMute(isMuted: boolean) {
        if (this.localAudioTrack) {
            await this.localAudioTrack.setEnabled(!isMuted);
        }
    }
}

export const agoraCallService = AgoraCallService.getInstance();
