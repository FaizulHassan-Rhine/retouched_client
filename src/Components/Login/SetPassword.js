import React, { useContext, useState } from "react";
import { useParams, useNavigate} from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrlContextManager, userContextManager } from "../../App";

const SetPassword = () => {

  const [getPassword, setPassword] =  useState("");
  const [getConfirmPass, setConfirmPass] = useState(""); 
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager); 

  let { token } = useParams();
  const navigate = useNavigate()

  const showToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageWarning = (msg) => {
    toast.warning(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const setPasswordFunc = async () => {

    if(getPassword == getConfirmPass){

      const passwordSet = {
        "verified_token": token,
        "password": getPassword,
        "confirm_password": getConfirmPass
      }
      try {
  
        const rawResponse = await fetch(getApiBasicUrl+'/set-password', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ getToken, 
          },
          body: JSON.stringify(passwordSet)
        });
  
        const res = await rawResponse.json();
        console.log(res); 
        if(res.status_code == 200){
          showToastMessage(res.message)
          navigate('/log-in')
        }else{
          showToastMessageWarning(res.message)
        }
  
      } catch (error) {
        showToastMessageWarning(error)
      }
    }else{
      showToastMessageWarning("Password is not match")
    }

  }

  /*
    {
      "results": {
          "token": null,
          "return_url": "http://retouched.ai/api/2023-02/system-sign-in"
      },
      "message": "User Info Updated Successfully",
      "status": "success",
      "status_code": 205
  } 
*/
  return (
    <div className="container mx-auto">
      <div className="px-6 mt-20 text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-3xl mb-0 mr-4">Set Password</p>
              </div>

              <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

              <div className="mb-6">
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Password"
                />
              </div>

              <div className="mb-6">
                <input
                  onChange={(e)=>setConfirmPass(e.target.value)}
                  type="password"
                  className={"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none focus:border-blue-600"}
                  id="exampleFormControlInput2"
                  placeholder="Confirm Password"
                />
              </div>
            </form>
            <div className="text-center">
              <button
                onClick={setPasswordFunc}
                className=" w-full mb-5 py-3 bg-green-700 text-white font-medium rounded-md text-sm "
              >
                CREATE PASSWORD
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
