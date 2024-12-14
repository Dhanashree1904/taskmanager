import { useState } from "react";
import ModalWrapper from "./ModalWrapper";  
import { toast } from "sonner";  
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice"; 

import Button from "./Button";  

const ChangePassword = ({ open, setOpen }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [changePassword] = useChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      
      await changePassword({
        oldPassword,
        password: newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      setOpen(false); 
    } catch (err) {
      setError("Error changing password. Please try again.");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <h2 className="text-xl font-semibold mb-4 text-center">Change Password</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Old Password */}
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-medium">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
            placeholder="Enter old password"
            required
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
            placeholder="Enter new password"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
            placeholder="Confirm your new password"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            label="Change Password"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ChangePassword;
