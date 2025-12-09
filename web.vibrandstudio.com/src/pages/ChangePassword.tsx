/**
 * ChangePassword.tsx
 * 
 * Page component for users to change their password.
 */

import './changePassword.css';
import { ErrorNotification } from '../components/ErrorNotification';
import LoginService from '../services/loginService';
import { useEffect, useState } from 'react';

/**
 * ChangePassword
 * 
 * Displays a form for users to change their password.
 * 
 * Features:
 * - Enter current password for verification
 * - Enter new password
 * - Confirm new password with validation
 * - Logout button
 * - Success/error notifications
 * - Auto-reload on successful password change
 * 
 * @component
 * @returns {JSX.Element} The change password form component
 * 
 * @example
 * <ChangePassword />
 */
function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match');
            return;
        }

        try {
            const response = await LoginService.changePassword(oldPassword, newPassword);
            if (response) {
                setSuccess('Password changed successfully');
                setError(null);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            setError('Failed to change password');
            setSuccess(null);
            setTimeout(() => {
                setError(null);
            }, 3000);
            }
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    useEffect(() => {
        setButtonDisabled(
            !(oldPassword && newPassword && confirmNewPassword && newPassword === confirmNewPassword)
        );
    }, [oldPassword, newPassword, confirmNewPassword]);

    const logout = async () => {
        await LoginService.logout();
        window.location.reload();
    }

    return (
        <>
            <ErrorNotification error={error} onClose={() => setError(null)} />
            <main>
            <form className="passwordForm" onSubmit={handleSubmit}>
                <h2 className='logout' onClick={logout}>Logout</h2>
                {success && <div className="message success">{success}</div>}
                <h2>Change Password</h2>

                <PassInput
                    name="currentPassword"
                    label="Current Password"
                    value={oldPassword}
                    onChange={setOldPassword}
                />

                <PassInput
                    name="newPassword"
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                />

                <PassInput
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={setConfirmNewPassword}
                />

                <button disabled={buttonDisabled} type="submit">
                    Update Password
                </button>
            </form>
        </main>
        </>
    );
}

function PassInput({
    name,
    label,
    value,
    onChange,
}: {
    name: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
}) {
    const [show, setShow] = useState(false);

    return (
        <label>
            {label}:
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                type={show ? "text" : "password"}
                name={name}
                required
            />
            <span onClick={() => setShow(s => !s)}>
                {show ? "Hide" : "Show"}
            </span>
        </label>
    );
}

export { ChangePassword };
