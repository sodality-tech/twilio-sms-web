import { useRef, useState } from "react";
import {
  Authentication,
  AuthenticationMethod,
  mapAuthenticationError,
  useAuthentication,
} from "../../context/AuthenticationProvider";
import ErrorLabel from "../ErrorLabel/ErrorLabel";

import { getTwilioPhoneNumbers } from "../../hook/getTwilioPhoneNumbers";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import MessagesPage from "../MessagesPage/MessagesPage";

const loadingClassName = (loading = false) => loading ? 'loading' : ''

const EnvAuthenticationButton = () => {
	const [authentication, setAuthentication] = useAuthentication();
	const authenticationRef = useRef(authentication);
	const [showMessages, setShowMessages] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleError = (err) => {
		setError(mapAuthenticationError(err));
		setLoading(false);
	};

	const handlePhoneNumbersSuccess = () => {
		setAuthentication(authenticationRef.current);
		setShowMessages(true);
	};

	const handleSignIn = () => {
		// TODO: Pull from env
		const sid = 'sid';
		const token = 'token';
		const auth = new Authentication(
			sid,
			token,
			"",
			"",
			AuthenticationMethod.AUTH_TOKEN
		);
		authenticationRef.current = auth;
		/*
		 * We want to get phone numbers after sign-in because at minimum we want to know
		 * if the credentials have permissions for it before moving forward
		 *
		 */
		getTwilioPhoneNumbers(auth, 1)
			.then(handlePhoneNumbersSuccess)
			.catch(handleError);
	};

  if (showMessages) {
    return <MessagesPage />
  }
	return (
		<DefaultLayout>
			<ErrorLabel error={error} />
			<div
				style={{
          display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
        >
        {/* TODO if loading is true then show loading state instead of the button */}
				<button
					className={`btn btn-primary ${loadingClassName(loading)}`}
					id="AUTHENTICATION-API-KEY-ENV"
					type="button"
					onClick={() => {
						handleSignIn();
					}}
				>
					Connect
				</button>
			</div>
		</DefaultLayout>
	);
};

export default EnvAuthenticationButton;
