import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const selector = useSelector((state) => state.user);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Replace with your API endpoint
      const response = await axios.post("/api/change-password", { password });
      alert(response.data.message || "Password changed successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "An error occurred while changing the password."
      );
    }
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) {
      alert("ابتدا یک عکس انتخاب کنید.");
      return;
    }

    const formData = new FormData();
    formData.append("image", profileImage);

    try {
      // Replace with your API endpoint
      const response = await axios.post("http://192.168.1.99/tar/files/uploadAvatar.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //alert(response.data.message || "ذخیره شد.");
      alert(response.data)
    } catch (error) {
       // alert(error)
    //   alert(
    //     error.response?.data?.message ||
    //       "خطا در ذخیره عکس!"
    //   );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2> پروفایل من</h2>

        <img
          src={`http://192.168.1.99/tar/pics/${selector.image}`}
          width="100"
          alt="avatar"
          style={{borderRadius:"100px"}}
        />
        <h4>{selector.username}</h4>
      </div>

      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "10px",
          border: "solid black 1px",
          borderRadius: "10px",
        }}
      >
        {/* Profile Image Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3> عکس</h3>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          ) : (
            <p>عکسی انتخاب نشده</p>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange}  />
          <input type="text" name="file" value="1" hidden />
          <button className="btn btn-info btn-sm" onClick={handleImageUpload}> ذخیره عکس</button>
        </div>

        {/* Change Password Section */}
        <form onSubmit={handlePasswordChange}>
          <h3>تغییر رمز </h3>
          <div style={{ marginBottom: "10px" }} className="form-group">
            <label>رمز جدید :</label>
            <input
             className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }} className="form-group">
            <label> تکرار رمز:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <input type="text" name="pass" value="1" hidden />
          <button type="submit"  className="btn btn-primary float-right " > ذخیره </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
