import { useState } from "react";
import MessageComposer from "../MessageComposer/MessageComposer";
import MessageList from "../MessageList/MessageList";
import "./MessagesPage.css";

export const Tabs = ({phoneNumber=''}) => {
  const [activeTab, setActiveTab] = useState('messages')
  const [isRepliesOnly, setIsRepliesOnly] = useState(false)
  const handleActivateMessages = () => setActiveTab('messages')
  const handleActivateComposer = () => setActiveTab('composer')
  const isMessagesActive = activeTab === 'messages'
  const isComposerActive = activeTab === 'composer'
  const messagesTabClass = `tab-item messages-page-tabs-area ${isMessagesActive ? 'active' : ''}`
  const composerTabClass = `tab-item messages-page-tabs-area ${isComposerActive ? 'active' : ''}`

  return <>
    <div className="messages-page-tabs-container">
      <div className="messages-page-tabs-content">
        <ul className="tab tab-block">
          <li className={messagesTabClass} onClick={handleActivateMessages}>
            Messages
          </li>
          <li className={composerTabClass} onClick={handleActivateComposer}>
            Composer
          </li>
        </ul>
      </div>
    </div>
    {/* // add button to toggle for "replies only" */}
    <input
      type="checkbox"
      checked={isRepliesOnly}
      onChange={() => setIsRepliesOnly(!isRepliesOnly)}
    />
    <label>Replies Only</label>
    {isMessagesActive && <MessageList phoneNumber={phoneNumber} setIsRepliesOnly={setIsRepliesOnly} isRepliesOnly={isRepliesOnly} onActionClick={handleActivateComposer}/>}
    {isComposerActive && <MessageComposer phoneNumber={phoneNumber}/>}
  </>
}