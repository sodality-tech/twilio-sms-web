import axios from "axios";
import { toCredentials, useAuthentication } from "../context/AuthenticationProvider";

const useGetTwilioMessages = () => {
  const [authentication] = useAuthentication()
  const credentials = toCredentials(authentication)

  const request = async ({ phoneNumber }) => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`
    let result = []
    let countByPhoneNumber = {}

    const fromResult = await axios.get(url,
      {
        auth: credentials,
        params: { From: phoneNumber }
      })
    const toResult = await axios.get(url,
      {
        auth: credentials,
        params: { To: phoneNumber }
      })
    result = result
      .concat(fromResult.data.messages)
      .concat(toResult.data.messages)

    fromResult.data.messages.forEach(message => {
      const toNumber = message.to;
      countByPhoneNumber[toNumber] = (countByPhoneNumber[toNumber] || 0) + 1;
    });

    toResult.data.messages.forEach(message => {
      const fromNumber = message.from;
      countByPhoneNumber[fromNumber] = (countByPhoneNumber[fromNumber] || 0) + 1;
    });

    const sortByDate = (a, b) => Date.parse(a.date_created) > Date.parse(b.date_created) ? -1 : 1

    return {
      messages: result.sort(sortByDate),
      countByPhoneNumber
    }
  }

  return request
}

export default useGetTwilioMessages
