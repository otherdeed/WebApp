import './registration.css'
import RegUser from './regUser/regUser'
function RegistrationBlock({registrationUsers, onRemoveInListUser}){
    return (
        <div className="registrationBlock">
            {registrationUsers.length > 0 ? (
                registrationUsers.map(RegistrationUsers => (
                    <RegUser name={RegistrationUsers.name} nickName={RegistrationUsers.nickName} number={RegistrationUsers.number} email={RegistrationUsers.email} tgId={RegistrationUsers.tgId} onRemoveInListUser={() => onRemoveInListUser(RegistrationUsers.tgId)}/>
                ))
            ) : (
                <p>Новый юзеров нету</p>
            )}
        </div>
    )
}
export default RegistrationBlock