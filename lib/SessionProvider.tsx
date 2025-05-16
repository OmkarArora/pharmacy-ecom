import { useStorageState } from "@/hooks/useStorageState";
import {
	useContext,
	createContext,
	type PropsWithChildren,
	useState,
	useEffect,
} from "react";

import { Auth } from "aws-amplify";

const AuthContext = createContext<{
	signIn: (username: string, password: string) => Promise<void>;
	debugForceSignIn: () => Promise<void>;
	signUp: (username: string, password: string) => Promise<void>;
	confirmSignUp: (otp: string) => Promise<void>;
	signOut: () => void;
	cancelSignUpConfirmation: () => void;
	session?: string | null;
	isLoading: boolean;
	status: SessionStatus;
	showEmailConfirmOTPInput: boolean;
}>({
	signIn: () => Promise.resolve(),
	debugForceSignIn: () => Promise.resolve(),
	signUp: () => Promise.resolve(),
	confirmSignUp: () => Promise.resolve(),
	signOut: () => null,
	cancelSignUpConfirmation: () => null,
	session: null,
	isLoading: false,
	status: "unauthenticated",
	showEmailConfirmOTPInput: false,
});

// This hook can be used to access the user info.
export function useSession() {
	const value = useContext(AuthContext);
	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error("useSession must be wrapped in a <SessionProvider />");
		}
	}

	return value;
}
export const getAccessToken = async () => {
  try {
    const session = await Auth.currentSession(); // Auto-refresh if expired
    const accessToken = session.getAccessToken().getJwtToken(); // Use this in your Authorization header
    return accessToken;
  } catch (error) {
    console.error('Error getting current session:', error);
    // Redirect to login if refresh token expired
  }
};

type AuthDetails = {
	email: string;
	password: string;
};

export type SessionStatus =
	| "error"
	| "loading"
	| "unauthenticated"
	| "authenticated";

export function SessionProvider({ children }: PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState("session");
	const [_, setUsername] = useStorageState("username");

	const [status, setStatus] = useState<SessionStatus>("unauthenticated");
	const [showEmailConfirmOTPInput, setShowEmailConfirmOTPInput] =
		useState(false);

	const [authDetails, setAuthDetails] = useState<AuthDetails>({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (!!session) setStatus("authenticated");
	}, [session]);

	async function signIn(username: string, password: string) {
		setStatus("loading");
		try {
			const data = await Auth.signIn(username, password);
			setStatus("authenticated");

			if (data.username) {
				setUsername(data.username);
			}

			if (data?.signInUserSession?.accessToken?.jwtToken) {
				setSession(data.signInUserSession.accessToken.jwtToken);
				setStatus("authenticated");
			} else {
				throw new Error("Sign in failed");
			}
		} catch (error) {
			setStatus("error");
			throw error;
		}
	}

	async function debugForceSignIn() {
		setSession("sample");
		setStatus("authenticated");
	}

	async function signUp(email: string, password: string) {
		setStatus("loading");
		setAuthDetails({ email, password });
		try {
			// "custom:userType": "customer"
			const data = await Auth.signUp({
				username: email,
				password,
				attributes: { email },
			});
			if (data.userConfirmed) {
				signIn(email, password);
				setShowEmailConfirmOTPInput(false);
			} else {
				setShowEmailConfirmOTPInput(true);
			}
		} catch (error) {
			console.log("Error signing up:", error);
			setStatus("error");
			throw error;
		}
	}

	async function confirmSignUp(code: string) {
		try {
			const data = await Auth.confirmSignUp(authDetails.email, code);
			await signIn(authDetails.email, authDetails.password);
		} catch (error) {
			console.log("Error confirming sign-up:", error);
		}
	}

	function cancelSignUpConfirmation() {
		setAuthDetails({ email: "", password: "" });
		setShowEmailConfirmOTPInput(false);
		setStatus("unauthenticated");
	}

	return (
		<AuthContext.Provider
			value={{
				signIn,
				debugForceSignIn,
				signUp,
				signOut: () => {
					setSession(null);
				},
				confirmSignUp,
				cancelSignUpConfirmation,
				session,
				isLoading,
				status,
				showEmailConfirmOTPInput,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

// Sign In object
// const data = {
// 	Session: null,
// 	attributes: {
// 		email: "masobicy@cyclelove.cc",
// 		email_verified: true,
// 		sub: "54785418-c091-706d-9751-5248da12efe9",
// 	},
// 	authenticationFlowType: "USER_SRP_AUTH",
// 	client: {
// 		endpoint: "https://cognito-idp.us-east-1.amazonaws.com/",
// 		fetchOptions: {},
// 	},
// 	keyPrefix: "CognitoIdentityServiceProvider.6pedvi7sj27of7l5q5ndq8bo3s",
// 	pool: {
// 		advancedSecurityDataCollectionFlag: true,
// 		client: {
// 			endpoint: "https://cognito-idp.us-east-1.amazonaws.com/",
// 			fetchOptions: [],
// 		},
// 		clientId: "6pedvi7sj27of7l5q5ndq8bo3s",
// 		storage: "",
// 		userPoolId: "us-east-1_wc5t9ZO6J",
// 		wrapRefreshSessionCallback: "",
// 	},
// 	preferredMFA: "NOMFA",
// 	signInUserSession: {
// 		accessToken: {
// 			jwtToken:
// 				"eyJraWQiOiJlNXJzNnNhdDN4dDdabUNIN2cxSVZkemQ1QUcyZmNsOGFCQ0VndzhWcDhzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1NDc4NTQxOC1jMDkxLTcwNmQtOTc1MS01MjQ4ZGExMmVmZTkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV93YzV0OVpPNkoiLCJjbGllbnRfaWQiOiI2cGVkdmk3c2oyN29mN2w1cTVuZHE4Ym8zcyIsIm9yaWdpbl9qdGkiOiI1NGJhN2Q1NC04Y2YzLTRjMzMtYTMwNi1hYmQ3MTg1YTM2MjgiLCJldmVudF9pZCI6IjFmOGIwMmU4LTAyYTktNGRiMS1hZDQ3LWZkNjI1MGY5NDRlZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NDE1MjQ3NDIsImV4cCI6MTc0MTUyODM0MiwiaWF0IjoxNzQxNTI0NzQyLCJqdGkiOiJiOTg3MjUzNi0zODZhLTRkODMtYjdjZC04NDc2NzYzZjRkNTkiLCJ1c2VybmFtZSI6Im1hc29iaWN5QGN5Y2xlbG92ZS5jYyJ9.bvcRiURp6l_oQ7m4HYQPKzz60JxB52LFTt8AjMmgOIgcGgznHHt_rV8Nu9TosthSa_c-NnHmvrPBl8QB1lTNVpGw9I4ZqWh0msqzH7bK5StllRVXxcLkY37y3IgzJOl5_xvrYfDzuHTuYufFszYVJaUtCewszPtAqkfocYfpst5N8YHBLscRZJOS4sfZp92WEzLjm_ZTvwPFdxOIJJQzJSgAYktybtRexSMP-QiNjj46fpG54elOeiIltaLuWwWKRf1wZo-mhYVZiwmTWW4pbvpyG-SGq0ZsVWXTU9ZeUi9A0svz9CAtqHfSdCr2H9WOMjNJVa_D4rucRnKErpp-Sw",
// 			payload: [Object],
// 		},
// 		clockDrift: 0,
// 		idToken: {
// 			jwtToken:
// 				"eyJraWQiOiJcL3Rrb2ZnUXpUVEhLMkJsb0dlaUZydW0xazlZN05CVDlra2ZQT1lVTkE5WT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1NDc4NTQxOC1jMDkxLTcwNmQtOTc1MS01MjQ4ZGExMmVmZTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfd2M1dDlaTzZKIiwiY29nbml0bzp1c2VybmFtZSI6Im1hc29iaWN5QGN5Y2xlbG92ZS5jYyIsIm9yaWdpbl9qdGkiOiI1NGJhN2Q1NC04Y2YzLTRjMzMtYTMwNi1hYmQ3MTg1YTM2MjgiLCJhdWQiOiI2cGVkdmk3c2oyN29mN2w1cTVuZHE4Ym8zcyIsImV2ZW50X2lkIjoiMWY4YjAyZTgtMDJhOS00ZGIxLWFkNDctZmQ2MjUwZjk0NGVlIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3NDE1MjQ3NDIsImV4cCI6MTc0MTUyODM0MiwiaWF0IjoxNzQxNTI0NzQyLCJqdGkiOiJhNmFiNWEyOS05ZTk2LTQ5ZGQtYTk1MS05YzgwN2M3MmRiZGEiLCJlbWFpbCI6Im1hc29iaWN5QGN5Y2xlbG92ZS5jYyJ9.Qs2suMbadD3hN7FQhzIPZe8tSOjrMNdhQSdGlgIQPseNi56vhjfNnYOkPsKHjgTNGKd1_Gif_t15M58N839BwFA2fttsx75MiychvYHrGkVIdQtyYczOf9YvdCJIMt9q79onZHniIuuY6GT30cfQ_H_hRMyNm6nG_xRrG3l9Lf24tDvC8seFJ-Owx86gJQSjxXQ9kfflECpF1GXY96Xd7GeNZuyzEv__ViuV7JU71y7vjORh20d4qqKBp9by0xXxpUfECT_w3dDW5Q_svK2QKilQVOeP9YRutTsQO5MVKQIBypNcx95IWLC6dnNyzCiDqG9HPMN7YoQTozdzUZ9XAA",
// 			payload: [Object],
// 		},
// 		refreshToken: {
// 			token:
// 				"eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.PHb3zywlUaBdZ6Cj6nHIAOf4B6LY59kZAcZJ_64gf5ekw6cFn-C2MrhYSAnUSX1PZHhDWfoQCDlZAMpFZSfcOHqwcWFOY5qynU8Ig1bbmNSic_OIRNLu2sOksAA8wOotK1OPPaD9K9kYC7HvXzmsb-AZ2ANwGMPbbVQm21iMBlOqpA3PD2P-zSonKzdNRjRdhLhB8DdTbb6KPCD9RUhs6_fAe7J8L0Qul3yCK_vhXJxm2cdcXGUTU1gs2cagIGIGi-yTMc1_qPQj2FRApGRV4gWw1yslHm68JeDU0z6HFfxvhHOgS4l6Zjp6mZl7R4TeHcX6aRnTAVLEA2J5UAp_1g.TvIRwiP0Z3BF4wh_.fiIvpdatcyJieIVO48spLFitvk0kI-9NA2y_otI9EE56lOaIq6vwrRdlEc69gOaibSvVQ5zffPu8_bpUSuqmsNf1imeBd7xepzJUIOvVzEq7IY1QwCHTkDPJxamOOyOotTa2FBoogb70dJSM_l28qQ6xJJvnm3j_Y9t1a51-ebCWo3hAvw04ya0tDNP7j1jddmWNXwwYOjor_Rs78FrPYuecQEN7GKm0ym5zLwVQqtf8xgcohuhNhYGv4uiQR1vY0flimjU95EaCirr16Ab3p5ZmVuCVxh35O6O9F4K7a0FcVkMoc7aJLmgvqoPZDTgDWNXlke2PoB6DznM_lJOsb9n-5FXzdx762iFYbmU4Ovpe_CrfeQqX4xNMgjJ4BT5Y40XKiD8szlrh-T2zpEHse7rrundGD5f5y0GoYDRdnhgGw1TbSu2dQEpi1vOdWekQ22vvhP-XQfmnp_yqC7pXHCQyxl4o4IdWJNiifgedCW7PsuI7I-Rf6V07qHxOBNr8y7Y-paqoRRj3xxWg6HiCeg-gqNAlHC6nuLXVF-OWKAmzKbxsHpycpHatpEwXH-m7M783PQEYTSDMo2h_rXHzTnbt96s0sdkYxDMq7tbXfT23-LMKZbocrMiVeGhHzjvgwAvvwC8mJOzYvhktP7vbjKJgd8w8eMv6B0RngkD3OGIBkvmIEd8nSIgRdG_2FBtUoqraMMnrAGmVzMdsHANV7yFhlKs64yACZV7u4IT2-tSuEopDQalU30dslnflZit8vmLf5_X4OqtrF9UXQPsN44M4xjRUqAXkNKjeJEJrVqMdXh2tBGyMtW4mWnUXkX0MG3YfxHBIb0OqaorJWYtyJI8HG8q80kSfydhjl92NvTxgWsvgDvlS7oWHzhZ4Q9AtoajMQMgVohVJ23fLWQkeFvXPKUqVus342gJ-SOoYZ-RgR6UUY3YtsOaUAwOQE1D08bkJOdMyziHJkm5YnT7a4kQ3N7OfLiP7liXgNznIoPViVHOLo6OEZ4oENOxSPNLVfWxOo2aCjrLdozOvTqKYjeek32d7WePw_tLHGAZJE3LJ7jMxLZ8nzFbdvDSNT2ApTF08JSyKDz7rYKbTrTOrRxDr73rriAQ067uEtYX2X_-mpehxKIFeeWbEDf-iBXdJP_V5p8L8huwtrmnQy4EzpA7UXfJ0frYhWDkSZf8F7a68TOnYE_wtpUwoLvwgyEfYuKhsKFtBjQO83skTwp1gD0PSZsq6zpSMijvzh07Rlz12WW4-X4cX3ijJQb2Ortiam4_ErQPPZVTO0ZtpRhRHLXf1f3VDZBc.mzx2eRpW_u0iOE89u5J1XA",
// 		},
// 	},
// 	storage: "",
// 	userDataKey:
// 		"CognitoIdentityServiceProvider.6pedvi7sj27of7l5q5ndq8bo3s.masobicy@cyclelove.cc.userData",
// 	username: "masobicy@cyclelove.cc",
// };
