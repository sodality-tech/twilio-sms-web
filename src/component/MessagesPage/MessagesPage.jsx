import { useState } from "react";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import PhoneNumberSelector from "../PhoneNumberSelector/PhoneNumberSelector";
import { Tabs } from "./MessagesPageView";

const EMPTY_PHONE_NUMBER = ''

const MessagesPage = () => {
  const [error, setError] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(EMPTY_PHONE_NUMBER)

  const handleError = (err) => setError(err)

  const handlePhoneNumberChange = (v) => setPhoneNumber(v)

  const isPhoneNumberSelected = phoneNumber !== EMPTY_PHONE_NUMBER

  return <DefaultLayout>
    <h4>Messages</h4>
    <ErrorLabel error={error}/>
    <PhoneNumberSelector onError={handleError} onPhoneNumberChange={handlePhoneNumberChange}/>
    {isPhoneNumberSelected && <Tabs phoneNumber={phoneNumber}/>}
  </DefaultLayout>
}

export default MessagesPage
