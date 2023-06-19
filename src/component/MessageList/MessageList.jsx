import { useCallback, useEffect, useState } from "react";
import useGetTwilioMessages from "../../hook/useGetTwilioMessages";
import MessageCard from "../MessageCard/MessageCard";
import { Loading } from "./MessageListView";

const MessageList = ({phoneNumber = '', setIsRepliesOnly, isRepliesOnly=false, onActionClick=()=>{}, onComplete = () => {}, onError = () => {}}) => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [hasMounted, setHasMounted] = useState(false)
  const [previousPhoneNumber, setPreviousPhoneNumber] = useState(null)

  const handleSuccess = useCallback(({messages, countByPhoneNumber}) => {
    const messagesMapped = messages
      .map(v => ({
        messageSid: v.sid,
        direction: v.direction,
        from: v.from,
        to: v.to,
        date: v.date_created,
        status: v.status,
        body: v.body,
        // The phone number we requested messages from should be undefined
        messageCount: countByPhoneNumber[v.from] || countByPhoneNumber[v.to]
      }))
    setMessages(messagesMapped)
    setLoading(false)
  }, [setMessages, setLoading])

  const getMessages = useGetTwilioMessages({
    onSuccess: handleSuccess,
    onComplete: onComplete,
    onError: onError
  })
  
  const getMessagesForPhone = useCallback((phoneNumber) => {
    setIsRepliesOnly(false)
    getMessages({phoneNumber: phoneNumber}).then(handleSuccess).catch(onError).then(onComplete)
    setPreviousPhoneNumber(phoneNumber)
    setLoading(true)
  })

  useEffect(() => {
    setHasMounted(true)
  }, [setHasMounted])

  useEffect(() => {
    if (previousPhoneNumber !== phoneNumber && hasMounted) {
      getMessagesForPhone(phoneNumber)
    }
  }, [hasMounted, phoneNumber])

  if (loading) return <Loading className="h1 m-2"/>

  return messages.filter(v => {
    if (isRepliesOnly) {
      return v.direction === 'inbound'
    }
    return true
  }).map(v =>
    <MessageCard
      key={v.messageSid}
      messageSid={v.messageSid}
      from={v.from}
      to={v.to}
      body={v.body}
      direction={v.direction}
      status={v.status}
      date={v.date}
      getMessagesForPhone={getMessagesForPhone}
      onActionClick={onActionClick}
      messageCount={v.messageCount}
    />)
}

export default MessageList
