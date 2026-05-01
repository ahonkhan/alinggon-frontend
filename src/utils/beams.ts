import * as PusherPushNotifications from "@pusher/push-notifications-web";

export const initBeams = async (userId: string) => {
    const instanceId = process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID;
    if (!instanceId) {
        console.warn("Pusher Beams: NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID is missing. Push notifications will be disabled.");
        return;
    }

    try {
        const beamsClient = new PusherPushNotifications.Client({
            instanceId,
        });

        const state = await beamsClient.getRegistrationState();
        
        if (state === PusherPushNotifications.RegistrationState.PERMISSION_DENIED) {
            console.warn("Push notification permission denied");
            return;
        }

        await beamsClient.start();
        await beamsClient.setDeviceInterests([`user-${userId}`]);
        console.log("Pusher Beams initialized for user:", userId);
    } catch (error) {
        console.error("Pusher Beams initialization failed", error);
    }
};
