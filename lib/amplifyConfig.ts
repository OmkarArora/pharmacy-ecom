import { Amplify } from "aws-amplify";

Amplify.configure({
	Auth: {
		region: process.env.EXPO_PUBLIC_AMPLIFY_REGION,
		userPoolId: process.env.EXPO_PUBLIC_USER_POOL_ID,
		userPoolWebClientId: process.env.EXPO_PUBLIC_USER_POOL_CLIENT_ID,
		authenticationFlowType: "USER_PASSWORD_AUTH", // or other flow types
	},
});
