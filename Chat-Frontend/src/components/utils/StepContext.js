import React, { useState } from "react";
import Axios from "axios";
import App from "../../../App";
import createPersistedState from "use-persisted-state";

const useCounterState = createPersistedState("authData");
const useCounterState1 = createPersistedState("userInfo");
const useCounterState2 = createPersistedState("userInfo2");
const useCounterState3 = createPersistedState("hostId");
const useCounterState4 = createPersistedState("coinListLocal");
export const multiStepContext = React.createContext();

const StepContext = () => {
  const [authData, setAuthData] = useCounterState([]);
  const [openFilemanager, setOpenFilemanager] = useState(false);
  const [hostId, setHostId] = useCounterState3("");
  const [userInfo, setUserInfo] = useCounterState1(false);
  const [userInfo2, setUserInfo2] = useCounterState2(false);
  const [coinListLocal, setCoinListLocal] = useCounterState4([
    "bitcoin",
    "ethereum",
    "litecoin",
    "bitcoin-cash",
    "binancecoin",
    "ripple",
    "polkadot",
    "dogecoin",
    "chainlink",
  ]);
  const [loadingS, setLoadingS] = useState(false);
  const [currentStep, setStep] = useState(1);
  const [projectData, setProjectData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [fReviewData, setFReviewData] = useState([]);
  const [addProjectStat, setAddProjectStat] = useState(false);
  const [reviewDetailStat, setReviewDetailStat] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [currentStepP, setStepP] = useState(1);
  const [bitData, setBitData] = useState([]);
  const [getBitData, setGetBitData] = useState([]);
  const [tabin, setTabin] = useState("mytime");
  function transferProjectData() {
    setFinalData((finalData) => [...finalData, projectData]);
  }
  Axios.defaults.withCredentials = true;
  const AddressUrl = process.env.REACT_APP_ADDRESS;
  const BackendPort = process.env.REACT_APP_BACKENDPORT;
  function submitProject(setRefresh, setIdTop) {
    try {
      Axios.post("http://" + AddressUrl + ":" + BackendPort + "/postproject", {
        projectname: projectData["projectName"],
        category: projectData["category"],
        explain: projectData["explain"],
        description: projectData["description"],
        recruitment: projectData["recruitment"],
        minbudget: projectData["minbudget"],
        maxbudget: projectData["maxbudget"],
        username: "masoud bakhshi",
        deadlinedate: projectData["deadlinedate"],
      }).then((response) => {
        // console.log("response");
        setIdTop(9999999999999);
        setRefresh(true);
      });
      setProjectData("");
    } catch (error) {}
  }

  function submitReview(setRefresh, setIdTop) {
    try {
      Axios.post("http://" + AddressUrl + ":" + BackendPort + "/postreview", {
        subject: reviewData["subject"],
        category: reviewData["category"],
        publication: reviewData["publication"],
        review: reviewData["review"],
        link: reviewData["link"],
      }).then((response) => {
        //console.log("response");

        setIdTop(9999999999999);
        setRefresh(true);
      });
      setReviewData("");
    } catch (error) {}
  }

  // function getProfile() {
  //   try {
  //     Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getprofile").then((response) => {
  //       setProfileData(response.data.result[0]);
  //     });
  //   } catch (error) {}//
  // }
  function submitProfile() {
    try {
      Axios.post("http://" + AddressUrl + ":" + BackendPort + "/postprofile", {
        profileName: profileData["profileName"],
        profileEmail: profileData["profileEmail"],
        freelance: profileData["freelance"],
        birth: profileData["birth"],
        mainDescription: profileData["mainDescription"],
        highSchool: profileData["highSchool"],
        bachelorsDegreeMajor: profileData["bachelorsDegreeMajor"],
        bachelorsDegreeUniversity: profileData["bachelorsDegreeUniversity"],
        mastersDegreeMajor: profileData["mastersDegreeMajor"],
        mastersDegreeUniversity: profileData["mastersDegreeUniversity"],
        doctorateDegreeMajor: profileData["doctorateDegreeMajor"],
        doctorateDegreeUniversity: profileData["doctorateDegreeUniversity"],
        position1: profileData["position1"],
        workingPlace1: profileData["workingPlace1"],
        description1: profileData["description1"],
        position2: profileData["position2"],
        workingPlace2: profileData["workingPlace2"],
        description2: profileData["description2"],
        position3: profileData["position3"],
        workingPlace3: profileData["workingPlace3"],
        description3: profileData["description3"],
        skills1: profileData["skills1"],
        skills2: profileData["skills2"],
        skills3: profileData["skills3"],
        skills4: profileData["skills4"],
      }).then((response) => {});
      setProfileData("");
    } catch (error) {}
  }
  function submitBit() {
    try {
      Axios.post("http://" + AddressUrl + ":" + BackendPort + "/postbit", {
        useremail: bitData["usernamep"],
        projectid: bitData["projectid"],
        projectname: bitData["projectname"],
        description: bitData["description"],
        budget: bitData["budget"],
        time: bitData["time"],
        mydeadline: bitData["mydeadline"],
      }).then((response) => {
        // /console.log("response");
      });
      setBitData("");
    } catch (error) {}
  }
  function getProfile() {
    try {
      Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getprofile", {
        params: {
          uInfo: userInfo2,
        },
      }).then((response) => {
        if (response.data.result[0] !== "no result") {
          setProfileData(response.data.result[0]);
        } else {
          setProfileData("");
        }
      });
    } catch (error) {}
  }
  function isLogin() {
    try {
      Axios.get("http://" + AddressUrl + ":" + BackendPort + "/login")
        .then((response) => {
          // console.log(response);
          if (response.data.loggedIn === true) {
            setAuthData(true);
            setLoadingS(false);
            // console.log("log1");
          } else {
            // console.log("log2");
            setAuthData(false);
            setLoadingS(true);
          }
        })
        .catch((err) => {
          setAuthData(false);
          setLoadingS(true);
          // console.log(err.status);
        });
    } catch (error) {}
  }
  function getbit() {
    try {
      Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getbit").then(
        (response) => {
          setGetBitData(response.data.result);
        }
      );
    } catch (error) {}
  }
  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentStep,
          setStep,
          projectData,
          setProjectData,
          finalData,
          setFinalData,
          transferProjectData,
          submitProject,

          addProjectStat,
          setAddProjectStat,

          reviewDetailStat,
          setReviewDetailStat,
          reviewData,
          setReviewData,
          fReviewData,
          setFReviewData,
          submitReview,
          authData,
          setAuthData,
          profileData,
          setProfileData,
          currentStepP,
          setStepP,
          submitProfile,
          getProfile,
          userInfo,
          setUserInfo,
          isLogin,

          bitData,
          setBitData,
          submitBit,
          getbit,
          getBitData,
          setGetBitData,
          tabin,
          setTabin,
          userInfo2,
          setUserInfo2,
          loadingS,
          setLoadingS,
          openFilemanager,
          setOpenFilemanager,
          hostId,
          setHostId,
          coinListLocal,
          setCoinListLocal,
        }}
      >
        <App />
      </multiStepContext.Provider>
    </div>
  );
};

export default StepContext;
