import ErrorLabel from "../ErrorLabel/ErrorLabel";
import DefaultLayout from "../DefaultLayout/DefaultLayout";

const AuthenticationPageView = ({ accountInfo = {},
                                  accountSid = '',
                                  authToken = '',
                                  error = null,
                                  loading = false,
                                  onAccountSidChange = () => {},
                                  onAuthTokenChange = () => {},
                                  onSubmit = () => {} }) => {

  const AccountDetails = () => {
    if (Object.keys(accountInfo).length === 0) return null
    return (
      <div className="flex-centered">
        <div className="card">
          <div className="card-header bg-success">
            <h6>Authentication Success</h6>
          </div>
          <div className="card-body">
            <span className="text-bold">Name: </span>{accountInfo.name}<br/>
            <span className="text-bold">Type: </span>{accountInfo.type}<br/>
            <span className="text-bold">Status: </span>{accountInfo.status}<br/>
            <span className="text-bold">Created: </span>{accountInfo.dateCreated}<br/>
            <span className="text-bold">Updated: </span>{accountInfo.dateUpdated}<br/>
          </div>
        </div>
      </div>
    )
  }

  const loadingClass = loading ? 'loading' : ''

  return (
    <DefaultLayout>
      <h4>Authentication</h4>
      <ErrorLabel error={error}/>
      <form onSubmit={onSubmit}>
        <label className="form-label">Account SID
          <input className="form-input" type="text" name="AccountSid"
                 value={accountSid}
                 onChange={e => onAccountSidChange(e.target.value)}
                 disabled={loading} placeholder="See Twilio console 'Account SID' "
          />
        </label>
        <label className="form-label">Auth Token
          <input className="form-input" type="password" name="AuthToken"
                 value={authToken}
                 onChange={e => onAuthTokenChange(e.target.value)}
                 disabled={loading} placeholder="See Twilio console 'Auth Token'"
          />
        </label>
        <button className={`btn btn-primary m-2 ${loadingClass}`} type="submit">Authenticate</button>
      </form>
      <AccountDetails/>
    </DefaultLayout>
  )
}

export default AuthenticationPageView