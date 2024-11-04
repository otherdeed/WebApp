import './registration.css'
import RegUser from './regUser/regUser'
function RegistrationBlock({registrationUsers, onRemoveInListUser}){
    return (
        <div className="registrationBlock">
            {registrationUsers.length > 0 ? (
                registrationUsers.map(RegistrationUsers => (
                    <RegUser name={RegistrationUsers.name} username={RegistrationUsers.username} phone={RegistrationUsers.phone} email={RegistrationUsers.email} tgId={RegistrationUsers.tgId} created_at={RegistrationUsers.created_at} onRemoveInListUser={() => onRemoveInListUser(RegistrationUsers.tgId)}/>
                ))
            ) : (
                <p>Новый юзеров нету</p>
            )}
        </div>
    )
}
export default RegistrationBlock