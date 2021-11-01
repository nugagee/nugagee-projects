import React, { useState, useEffect } from "react";
import InputField from "../../../components/InputField/index";
import Select from "../../../components/Dropdown/index";
import Button from "../../../components/Button/index";
import logo from "../../../assets/img/Layer x0020 1.png";
import Loader from "../../../components/Loader";
import { request } from "../../../services/apiservice";
import Alert from "../../../components/Alert";
import Expire from "../../../components/Expire";
import apiroutes from "../../../services/apiroutes";
import { getAuth, getUser, setUser } from "../../../services/auth";
import { useHistory } from "react-router";

const EditProfile = () => {
 const loggedInUser = getUser();
 const [image, setImage] = useState({ preview: "", raw: "" });
 const [email, setEmail] = useState("");
 const [gender, setGender] = useState("");
 const [fullName, setFullName] = useState("");
 const [valueTwo, setValueTwo] = useState("");
 const [fullNameNext, setFullNameNext] = useState("");
 const [nextMobile, setNextMobile] = useState("");
 const genderOptions = ["Male", "Female"];
 const optionsGender = genderOptions.map((x) => ({ label: x, value: x }));
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [responseMsg, setResponseMsg] = useState("");
 const token = getAuth("access_token");
 const [user, setUserDetails] = useState(null);
 const history = useHistory();
 
 useEffect(() => {
   if (loggedInUser === null) {
     history.push("/");
     return false;
   } else {
     setUserDetails(loggedInUser);
   }
   // eslint-disable-next-line
 }, []);
 
 useEffect(() => {
   if (loggedInUser === null) {
     return false;
   } else {
     setValueTwo(loggedInUser.PhoneNumber);
     setFullName(loggedInUser.FirstName);
     setEmail(loggedInUser.Email);
     setNextMobile(loggedInUser.NextOfKinPhone);
     setFullNameNext(loggedInUser.NextOfKinName);
     setGender(loggedInUser.Gender === 0 ? "Male" : "Female");
   }
   // eslint-disable-next-line
 }, []);
 
 const handleChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     const fileType = file["type"];
     const validImageTypes = ["image/gif", "image/png", "image/jpeg"];
     if (validImageTypes.includes(fileType)) {
       setError("");
       setResponseMsg("Processing");
       setImage({
         preview: URL.createObjectURL(file),
         raw: file,
       });
       const formData = new FormData();
       formData.append("imageFile", file);
       request(
         apiroutes.UpdatePhoto(loggedInUser.PhoneNumber),
         "post",
         formData,
         token
       )
         .then((res) => {
           console.log(res);
           if (
             res.data.Code === null ||
             res.data.Object === null ||
             res.data.Object === null
           ) {
             // setLoading(false);
             setResponseMsg(null);
             setError(res.data.ShortDescription);
           } else {
             // setLoading(false);
             setResponseMsg("Photo Uploaded Successfully");
             const data = {
               Email: res.data.Object.Email,
               FirstName: res.data.Object.FirstName,
               Gender: res.data.Object.Gender,
               Image: res.data.Object.Image,
               IsActive: res.data.Object.IsActive,
               NextOfKinName: res.data.Object.NextOfKinName,
               NextOfKinPhone: res.data.Object.NextOfKinPhone,
               PhoneNumber: res.data.Object.PhoneNumber,
               ReferralCode: res.data.Object.ReferralCode,
               UserId: res.data.Object.UserId,
               UserType: res.data.Object.UserType,
             };
             setUser(data);
           }
         })
         .catch((err) => {
           console.log(err);
           // setError(err.data.shortDescription);
           setResponseMsg(null);
           // setLoading(false);
         });
     } else {
       setError("Please select an image to upload");
     }
   }
 };
 
 const deleteImage = () => {
   setError(null);
   setResponseMsg("processing");
   request(apiroutes.DeletePhoto(loggedInUser.UserId), "delete", null, token)
     .then((res) => {
       console.log(res);
       setResponseMsg("Photo Deleted Successfully");
       const data = {
         Email: res.data.Object.Email,
         FirstName: res.data.Object.FirstName,
         Gender: res.data.Object.Gender,
         Image: res.data.Object.Image,
         IsActive: res.data.Object.IsActive,
         NextOfKinName: res.data.Object.NextOfKinName,
         NextOfKinPhone: res.data.Object.NextOfKinPhone,
         PhoneNumber: res.data.Object.PhoneNumber,
         ReferralCode: res.data.Object.ReferralCode,
         UserId: res.data.Object.UserId,
         UserType: res.data.Object.UserType,
       };
       setUser(data);
     })
     .catch((err) => {
       console.log(err);
       setError(err.data.shortDescription);
       setResponseMsg(null);
       // setLoading(false);
     });
 };
 
 const handleSubmit = (e) => {
   e.preventDefault();
   setError("");
   setResponseMsg("Processing");
   setLoading(true);
   const data = {
     name: fullName,
     sex: gender === "Male" ? 0 : 1,
     email: email,
     nextOfKinName: fullNameNext,
     nextOfKinMobile: nextMobile,
     mobile: valueTwo,
   };
   console.log(data);
   request(apiroutes.UpdatePassegerProfile(), "post", data, token)
     .then((res) => {
       console.log(res);
       setResponseMsg("Profile Details Updated Successfully");
       setLoading(false);
       const data = {
         Email: res.data.Object.Email,
         FirstName: res.data.Object.FirstName,
         Gender: res.data.Object.Gender,
         Image: res.data.Object.Image,
         IsActive: res.data.Object.IsActive,
         NextOfKinName: res.data.Object.NextOfKinName,
         NextOfKinPhone: res.data.Object.NextOfKinPhone,
         PhoneNumber: res.data.Object.PhoneNumber,
         ReferralCode: res.data.Object.ReferralCode,
         UserId: res.data.Object.UserId,
         UserType: res.data.Object.UserType,
       };
       setUser(data);
     })
     .catch((err) => {
       console.log(err);
       setError(err.data.shortDescription);
       setResponseMsg(null);
       setLoading(false);
     });
 };
 
 return (
   <div>
     <div className="row justify-content-md-center">
       <div className="col-6">
         {error && (
           <Expire delay={3000}>
             <Alert className="alert text-center alert-danger" text={error} />
           </Expire>
         )}
         {responseMsg && !error && (
           <Expire delay={3000}>
             <Alert
               className="alert text-center alert-primary"
               text={responseMsg}
             />
           </Expire>
         )}
       </div>
     </div>
     <div className="profilePic text-center mb-5">
       <h2>Settings</h2>
       <div>
         {image.preview ? (
           <div className="profilepic-holder">
             <img
               src={image.preview}
               style={{ borderRadius: "50%" }}
               alt="dummy"
               width="80"
               height="80"
             />
           </div>
         ) : (
           <div className="profilepic-holder">
             {user === null ? (
               <img
                 src={logo}
                 style={{ borderRadius: "50%" }}
                 alt="dummy"
                 width="80"
                 height="80"
               />
             ) : (
               <img
                 src={
                   user.Image === null || user.Image === "" ? logo : user.Image
                 }
                 style={{ borderRadius: "50%" }}
                 alt={user.FirstName}
                 width="80"
                 height="80"
               />
             )}
           </div>
         )}
       </div><br/>
       
       <label htmlFor="upload-button">
         <i className="fa fa-edit edit mr-2" style={{ cursor: "pointer" }}></i>
       </label>
       <input
         type="file"
         id="upload-button"
         style={{ display: "none" }}
         onChange={handleChange}
       />
 
       <i
         className="fa fa-trash trash"
         onClick={deleteImage}
         style={{ cursor: "pointer" }}
       ></i>
     </div>
 
     <div>
       <div className="setting-row">
         <div className="row row-grid">
           <div className="col-md-6 col-sm -12">
             <div className="setting-col11">
               <label htmlFor="name">Full Name</label>
               <InputField
                 type="text"
                 placeholder="Kuti olaribigbe Seyi"
                 onChangeMethod={(e) => setFullName(e.target.value)}
                 value={fullName}
               />
               <br />
               <br />
               <label htmlFor="email">Email</label>
               <InputField
                 type="email"
                 placeholder="Demmah16@gmail.com"
                 // onChangeMethod={(e) => setEmail(e.target.value)}
                 value={email}
                 readonly={true}
               />
               <br />
               <br />
               <label htmlFor="email">Next Of Kin Name</label>
               <InputField
                 type="text"
                 placeholder="Enter Name"
                 onChangeMethod={(e) => setFullNameNext(e.target.value)}
                 value={fullNameNext}
               />
             </div>
           </div>
           <div className="col-md-6 col-sm -12">
             <div className="setting-col11">
               <label htmlFor="sex">Sex</label>
               <Select
                 options={optionsGender}
                 handleChange={(e) => setGender(e.value)}
                 placeholder="Select gender"
                 value={gender}
               />
               <br />
               <label htmlFor="number">Phone number</label>
               <InputField
                 type="number"
                 placeholder="08136478364"
                 // onChangeMethod={(e) => setValueTwo(e.target.value)}
                 value={valueTwo}
                 readonly={true}
               />
               <br />
               <br />
               <label htmlFor="number">Next Of Kin Phone number</label>
               <InputField
                 type="number"
                 placeholder="08136478364"
                 onChangeMethod={(e) => setNextMobile(e.target.value)}
                 value={nextMobile}
               />
             </div>
           </div>
         </div><br/>
 
         {/* <div className="row">
               <div className="col-md-12">
                 <div className="setting-row2">
                   <h2>Security</h2>
                 </div>
               </div>
               <div className="col-md-6 col-sm -12">
                 <div className="setting-col11">
                   <label htmlFor="name">Old Password</label>
                   <div className="password-input">
                     <InputField
                       type="password"
                       placeholder="**********"
                       onChangeMethod={() => {}}
                     />
                     <i className="fa fa-eye-slash" aria-hidden="true"></i>
                   </div>
                 </div>
               </div>
 
               <div className="col-md-6 col-sm -12">
                 <div className="setting-col11">
                   <label htmlFor="name">New Password</label>
                   <div className="password-input">
                     <InputField
                       type="email"
                       placeholder="**********"
                       onChangeMethod={() => {}}
                     />
                     <i className="fa fa-eye-slash" aria-hidden="true"></i>
                   </div>
                 </div>
               </div>
             </div> */}
 
         <div className="row row-grid">
           <div className="col-md-12">
             <div className="setting-button">
               <Button
                 text={loading ? <Loader dark={false} /> : "Update"}
                 handleButtonClick={handleSubmit}
                 type="button"
                 disabled={!(fullName && gender && nextMobile && fullNameNext)}
                 btnstyle={{backgroundColor:"#E21D00"}}
               />
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default EditProfile;
