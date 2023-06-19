import { CopyTwoTone, RightCircleFilled } from "@ant-design/icons";
import { useComposerContext } from "../../context/ComposerProvider";
import MessageAction from "../MessageAction/MessageAction";
import "./MessageCard.css";

const toBaseDirection = direction => direction.includes('inbound') ? 'inbound' : 'outbound'
const messageLabelClass = direction => `message-card-label text-code text-small ${toBaseDirection(direction)}`
const messageLabelRotation = direction => toBaseDirection(direction) === 'inbound' ? 180 : 0
const copyStyle = {padding: '0', margin: '0'}

const toDateString = (date) => {
  const d = new Date(date)
  return `${d.toDateString()} ${d.toLocaleTimeString()}`
}

const copyToClipboard = (s) =>
  navigator.clipboard.writeText(s)
    .then(() => console.log('Text copied', s))
    .catch(() => console.log('Unable to copy to clipboard'))

const CopyToClipboard = ({txt}) => <>
  <div className="tooltip message-card-copy-btn" data-tooltip="Copy to clipboard" onClick={() => copyToClipboard(txt)}>
    <CopyTwoTone twoToneColor="#5755d9" style={copyStyle}/>
  </div>
</>

const messageActionOnClick = (baseDirection, from, to, setComposerContext, onActionClick) => {
  if (baseDirection === 'inbound') {
    setComposerContext(from)
  } else {
    setComposerContext(to)
  }
  onActionClick()
}

const MessageCard = ({messageCount = 1, messageSid='', direction='', from='', to='',
                      date=new Date(), status='', body='', onActionClick=()=>{}, getMessagesForPhone}) => {

  const [ , setComposerContext] = useComposerContext()
  const baseDirection = toBaseDirection(direction)

  return <>
    <div className="message-card">
      <div className={messageLabelClass(direction)}>
        <RightCircleFilled rotate={messageLabelRotation(direction)} />
      </div>
      <div className="message-card-main-container">
        <div className="message-card-header text-tiny">
        <span>
          <CopyToClipboard txt={from}/>
          <strong>From:</strong> <button onClick={() => getMessagesForPhone(from)}>{from}</button>
        </span>
          <span>
          <CopyToClipboard txt={to}/>
          <strong>To:</strong> <button  onClick={() => getMessagesForPhone(to)}>{to}</button>
        </span>
          <span className="message-card-header-status">
          <strong>Status:</strong> {status}
        </span>
          <span>
          <strong>Direction:</strong> {direction}
        </span>
          <span>
          <strong>Messages:</strong> {messageCount}
        </span>
        </div>
        <div className="message-card-body text-code text-small">
          {body}
        </div>
        <div className="message-card-footer text-tiny">
          <strong>Date: </strong>{toDateString(date)}
          <span>
            <strong>MessageSid: </strong>{messageSid}
          </span>
        </div>
        <div className="message-card-action-container">
          <MessageAction
            direction={baseDirection}
            onClick={() => messageActionOnClick(baseDirection, from, to, setComposerContext, onActionClick)}
          />
        </div>
      </div>
    </div>
  </>
}

export default MessageCard
