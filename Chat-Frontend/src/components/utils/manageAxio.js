import React, { createRef } from "react";
import Axios from "axios";
import moment from "moment";
import { v4 as uuidV4 } from "uuid";
// const dotenv = require("dotenv");
// dotenv.config();
var token = localStorage.getItem("token");
Axios.defaults.withCredentials = true;
Axios.defaults.headers.common = {
  Authorization: `bearer ${localStorage.getItem("token")}`,
};
const AddressUrl = process.env.REACT_APP_ADDRESS;
const BackendPort = process.env.REACT_APP_BACKENDPORT;
const CompilerPort = process.env.REACT_APP_COMPILERPORT;
const ApiServerPort = process.env.REACT_APP_APISERVER;
const UrlShortPort = process.env.REACT_APP_URLSHORTPORT;
//************************************************************************************************************************************* */

export const logoutAuth = (setLoadingS, setAuthData) => {
  Axios.get("http://" + AddressUrl + ":" + BackendPort + "/logout").then(
    (response) => {
      localStorage.setItem("token", null);
      setLoadingS(true);
      setAuthData(false);
    }
  );
};

//************************************************************************************************************************************* */

export const getOrder = (setDataProject, setAuthData, setLoadingS, idTop) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getmyproject", {
      params: {
        id: idTop,
      },
    })
      .then((response) => {
        setDataProject(response.data.result);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const getbit = (setBitsData, setAuthData, setLoadingS) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };

    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getbit")
      .then((response) => {
        setBitsData(response.data.result);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const getAuthInfo = (setAuthData, setUserInfo, setLoadingS) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/login")
      .then((response) => {
        if (response.data.loggedIn === true && localStorage.getItem("token")) {
          setLoadingS(false);
          setAuthData(true);
          setUserInfo(response.data.user[0].useremail);
        } else {
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const searchUser = (
  id,
  setSearchValue,
  setOpenS,
  prevOpenS,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/searchuser", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        if (response.data.result !== "no result") {
          setSearchValue(response.data.result);
          setOpenS((prevOpenS) => true);
        } else {
          setSearchValue([
            {
              id: 0,
              useremail: "sorry!",
            },
          ]);
          setOpenS((prevOpenS) => true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const searchProjectPost = (
  id,
  setSearchProjectValue,
  setOpenS,
  prevOpenS,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/searchproject", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        if (response.data.result !== "no result") {
          setSearchProjectValue(response.data.result);

          setOpenS((prevOpenS) => true);
        } else {
          setSearchProjectValue([
            {
              id: 0,
              projectname: "sorry!",
            },
          ]);
          setOpenS((prevOpenS) => true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const searchIdeaPost = (
  id,
  setSearchIdeaValue,
  setOpenS,
  prevOpenS,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/searchidea", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        if (response.data.result !== "no result") {
          setSearchIdeaValue(response.data.result);

          setOpenS((prevOpenS) => true);
        } else {
          setSearchIdeaValue([
            {
              id: 0,
              subject: "sorry!",
            },
          ]);
          setOpenS((prevOpenS) => true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const searchQuestionPost = (
  id,
  setSearchQuestionValue,
  setOpenS,
  prevOpenS,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/searchquestion", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        if (response.data.data !== "no result") {
          setSearchQuestionValue(response.data.data);

          setOpenS((prevOpenS) => true);
        } else {
          setSearchQuestionValue([
            {
              id: 0,
              title: "sorry!",
            },
          ]);
          setOpenS((prevOpenS) => true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const handleMenuLogOut = (setLoadingS, setAuthData) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    // console.log("response");
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/logout").then(
      (response) => {
        // console.log(response);
        localStorage.setItem("token", null);
        setLoadingS(true);
        setAuthData(false);
      }
    );
  } catch (error) {
    console.log(error);
  }
  // setAnchorEl(null);
  // handleMobileMenuClose();
};
//************************************************************************************************************************************* */
export const getTimeline = (
  username,
  setDataReview,
  setProgress,
  setAuthData,
  setLoadingS
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/gettimeline", {
      params: {
        uInfo: username,
      },
    })
      .then((response) => {
        setDataReview(response.data.result);
        setProgress(false);
      })
      .catch((error) => {
        // getTimeline();

        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const getChatRoom = (setChatRoom, setLoadingS, setAuthData) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getchatroom")
      .then((response) => {
        setChatRoom(response.data.result);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};

//************************************************************************************************************************************* */
export const getdemoprofile = (
  setProfileData,
  setProgress,
  username,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getdemoprofile", {
      params: {
        uInfo: username,
      },
    })
      .then((response) => {
        setProfileData(response.data.result);
        setProgress(false);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const gettodologin = (setPayload, setLoadingS, setAuthData) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setPayload({
            title: "",
            text: "",
            username: response.data.user[0].useremail,
            access: response.data.user[0].useremail,
          });
        } else {
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const handleIncludeTodo = async (
  payload,
  setResetP,
  setOpen,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertfiletodo",
      payload
    )
      .then((response) => {
        // if(response.data)
        // if(response.data==="bad word detection")
        //  {
        //   console.log(response.data);}
      })
      .catch((error) => {
        // console.log("error.status");
        // console.log(error);
        // console.log(error.status);
        logoutAuth(setLoadingS, setAuthData);
      });
    setResetP(true);
    setOpen(false);
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const getTodo = async (
  setAuthData,
  setLoadingS,
  setPay,
  revID,
  setPayload,
  setResetP
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          // getTodo();

          Axios.get(
            "http://" +
              AddressUrl +
              ":" +
              BackendPort +
              "/gettodo" +
              "?id=" +
              revID
          )
            .then((response) => {
              if (response.data) {
                setPay(response.data.data);
              }
            })
            .catch((error) => {
              logoutAuth(setLoadingS, setAuthData);
            });
          setPayload({
            id: revID,
            username: response.data.user[0].useremail,
            check: "false",
            text: "",
            who: "",
          });
        } else {
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
    setResetP(false);
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const includeTodo = async (
  payload,
  setResetP,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/inserttodo",
      payload
    )
      .then((response) => {})
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });

    setResetP(true);
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const searchUserTo = (
  id,
  setSearchValue,
  setOpenS,
  setLoadingS,
  setAuthData,
  prevOpenS
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/searchuser", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        if (response.data.result !== "no result") {
          setSearchValue(response.data.result);
          // setOpenS((prevOpenS) => !prevOpenS);
          setOpenS((prevOpenS) => true);
        } else {
          setSearchValue([
            {
              id: 0,
              username: " ",
              password: " ",
              userfamilyname: " ",
              useremail: "sorry!",
            },
          ]);
          setOpenS((prevOpenS) => true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const postAccessTodo = async (
  data,
  id,
  setLoadingS,
  setAuthData,
  setOpen,
  setSearchV
) => {
  if (data.useremail !== "sorry!") {
    try {
      Axios.defaults.withCredentials = true;
      Axios.defaults.headers.common = {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      };
      await Axios.post(
        "http://" + AddressUrl + ":" + BackendPort + "/postaccesstodo",
        {
          access: data.useremail,
          id: id,
        }
      )
        .then((response) => {})
        .catch((error) => {
          logoutAuth(setLoadingS, setAuthData);
        });
      setOpen(false);
      setSearchV("");
    } catch (error) {}
  }
};
//************************************************************************************************************************************* */
export const removeTodo = async (id, setResetP, setLoadingS, setAuthData) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" + AddressUrl + ":" + BackendPort + "/removetodo" + "?idd=" + id
    )
      .then((response) => {
        if (response.data) {
          setResetP(true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const checkTodo = async (
  id,
  checked,
  setResetP,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/checktodo" +
        "?idd=" +
        id +
        checked
    )
      .then((response) => {
        if (response.data) {
          setResetP(true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const getTodoFile = async (
  setPay,
  setProgress,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getfiletodo")
      .then((response) => {
        if (response.data) {
          setPay(response.data.data);
          setProgress(false);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const removeFileTodo = async (
  data,
  setResetP,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/removefiletodo" +
        "?idd=" +
        data._id
    )
      .then((response) => {
        if (response.data) {
          setResetP(true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getProjectStore = (
  idTop,
  setDataProject,
  dataProject,
  setMore,
  setIdTop,
  setProgress,
  setRefreshProject,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getproject", {
      params: {
        id: idTop,
      },
    })
      .then((response) => {
        ///setDataReview(...dataReview, response.data.result);
        if (response.data.result !== "no result") {
          if (idTop === 9999999999999) {
            setDataProject(response.data.result);
          } else {
            for (let i = 0; i < response.data.result.length; i++) {
              dataProject.push({
                username: response.data.result[i].username,
                recruitment: response.data.result[i].recruitment,
                projectname: response.data.result[i].projectname,
                deadlinedate: response.data.result[i].deadlinedate,
                minbudget: response.data.result[i].minbudget,
                id: response.data.result[i].id,
                maxbudget: response.data.result[i].maxbudget,
                description: response.data.result[i].description,
                category: response.data.result[i].category,
                explainmore: response.data.result[i].explainmore,
              });
            }
          }
        } else {
          setMore("Nothing there!");
        }
        setIdTop(response.data.result[response.data.result.length - 1].id);
        setProgress(false);
        setRefreshProject(false);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getMyProjectStore = (
  idTop,
  setDataProject,
  dataProject,
  setMore,
  setIdTop,
  setProgress,
  setRefreshProject,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getmyproject", {
      params: {
        id: idTop,
      },
    })
      .then((response) => {
        ///setDataReview(...dataReview, response.data.result);
        if (response.data.result !== "no result") {
          if (idTop === 9999999999999) {
            setDataProject(response.data.result);
          } else {
            for (let i = 0; i < response.data.result.length; i++) {
              dataProject.push({
                username: response.data.result[i].username,
                recruitment: response.data.result[i].recruitment,
                projectname: response.data.result[i].projectname,
                deadlinedate: response.data.result[i].deadlinedate,
                minbudget: response.data.result[i].minbudget,
                id: response.data.result[i].id,
                maxbudget: response.data.result[i].maxbudget,
                description: response.data.result[i].description,
                category: response.data.result[i].category,
                explainmore: response.data.result[i].explainmore,
              });
            }
          }
        } else {
          // setDataProject("");
          setMore("Nothing there!");
        }

        setIdTop(response.data.result[response.data.result.length - 1].id);
        //console.log(response.data.result);
        setProgress(false);
        setRefreshProject(false);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getProjId = (
  reMap,
  exi,
  revID,
  setDataId,
  setDataU,
  setBitId,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getidproject", {
      params: {
        id: revID,
      },
    })
      .then((response) => {
        setDataId(response.data.result);
        // console.log(response.data.result);
        setDataU({ username: response.data.result[0].username });
        setBitId({
          id: revID,
          username: response.data.result[0].username,
          projectname: response.data.result[0].projectname,
        });

        if (response.data.result === "no result") {
          // history.push({
          //   pathname: "/dashboard/allproject",
          //   // state: { dataR: dataR },
          // });
          reMap();
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {
    // console.log("response.data");
  }
};
//************************************************************************************************************************************** */
export const getComm = async (
  revID,
  setPay,
  setPayload,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getcomment" +
        "?id=" +
        "project -" +
        revID
    )
      .then((response) => {
        if (response.data) {
          setPay(response.data.data);

          setPayload({
            dataId: "15",
            dataKind: "project -" + revID,
            username: response.data.user[0].useremail,
            date: moment(moment.now()).format("DD-MM-YYYY hh:mm:ss"),
            // date: "1369/12/4",
            text: "",
          });
          // console.log(moment(moment.now()).format("DD-MM-YYYY hh:mm:ss"));
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const handleIncludeComment = async (
  payload,
  setResetP,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertcomment",
      payload
    )
      .then((response) => {})
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
    setResetP(true);
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const removeComment = async (
  data,
  setResetP,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/removecomment" +
        "?idd=" +
        data._id
    )
      .then((response) => {
        if (response.data) {
          setResetP(true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const removeProject = (
  id,
  setIdTop,
  setRefresh,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/removeproject" +
        "?id=" +
        id
    )
      .then((response) => {
        setIdTop(9999999999999);
        setRefresh(true);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getReview = (
  idTop,
  setDataReview,
  dataReview,
  setMore,
  setIdTop,
  setProgress,
  setReviewRefresh,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getreview", {
      params: {
        id: idTop,
      },
    })
      .then((response) => {
        if (response.data.result !== "no result") {
          if (idTop === 9999999999999) {
            setDataReview(response.data.result);
          } else {
            for (let i = 0; i < response.data.result.length; i++) {
              dataReview.push({
                username: response.data.result[i].username,
                subject: response.data.result[i].subject,
                review: response.data.result[i].review,
                publication: response.data.result[i].publication,
                link: response.data.result[i].link,
                id: response.data.result[i].id,
                file: response.data.result[i].file,
                date: response.data.result[i].date,
                category: response.data.result[i].category,
              });
            }
          }
        } else {
          setMore("Nothing there!");
        }
        setIdTop(response.data.result[response.data.result.length - 1].id);
        setProgress(false);
        setReviewRefresh(false);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getMyReview = (
  idTop,
  setDataReview,
  dataReview,
  setMore,
  setIdTop,
  setProgress,
  setReviewRefresh,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getmyreview", {
      params: {
        id: idTop,
      },
    })
      .then((response) => {
        if (response.data.result !== "no result") {
          if (idTop === 9999999999999) {
            setDataReview(response.data.result);
          } else {
            for (let i = 0; i < response.data.result.length; i++) {
              dataReview.push({
                username: response.data.result[i].username,
                subject: response.data.result[i].subject,
                review: response.data.result[i].review,
                publication: response.data.result[i].publication,
                link: response.data.result[i].link,
                id: response.data.result[i].id,
                file: response.data.result[i].file,
                date: response.data.result[i].date,
                category: response.data.result[i].category,
              });
            }
          }
        } else {
          // setDataReview("");
          setMore("Nothing there!");
        }

        setIdTop(response.data.result[response.data.result.length - 1].id);
        // console.log(response.data.result);
        setProgress(false);
        setReviewRefresh(false);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const RemoveArticle = (
  id,
  setIdTop,
  setRefresh,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" + AddressUrl + ":" + BackendPort + "/removereview" + "?id=" + id
    )
      .then((response) => {
        setIdTop(9999999999999);
        setRefresh(true);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getRevId = (
  revID,
  setDataId,
  setDataU,
  reMap,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getidreview", {
      params: {
        id: revID,
      },
    })
      .then((response) => {
        setDataId(response.data.result);
        // console.log(response.data.result);
        setDataU({ username: response.data.result[0].username });
        // console.log(response.data.result);
        if (response.data.result === "no result") {
          reMap();
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getReviewComm = async (
  revID,
  setPay,
  setPayload,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getcomment" +
        "?id=" +
        "review -" +
        revID
    )
      .then((response) => {
        //console.log(response);
        if (response.data) {
          setPay(response.data.data);

          setPayload({
            dataId: "15",
            dataKind: "review -" + revID,
            username: response.data.user[0].useremail,
            date: moment(moment.now()).format("DD-MM-YYYY hh:mm:ss"),
            text: "",
          });
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const handleIncludeQuestionComment = async (
  payload,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertcomment",
      payload
    )
      .then((response) => {})
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const handleIncludeQuestionCode = async (
  payload,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertquestion",
      payload
    )
      .then((response) => {})
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getMyQuestion = async (
  idTop,
  setDataQuestion,
  dataQuestion,
  setIdTop,
  setMore,
  setProgress,
  setQuestionRefresh,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getmyquestion" +
        "?idTop=" +
        idTop
    )
      .then((response) => {
        if (response.data) {
          if (response.data.data !== "no result") {
            if (idTop === "0") {
              setDataQuestion(response.data.data);
            } else {
              for (let i = 0; i < response.data.data.length; i++) {
                dataQuestion.push({
                  username: response.data.data[i].username,
                  code: response.data.data[i].code,
                  _id: response.data.data[i]._id,
                  title: response.data.data[i].title,
                  description: response.data.data[i].description,
                  tag: response.data.data[i].tag,
                  createdAt: response.data.data[i].createdAt,
                });
              }
            }
            if (response.data.data.length > 0) {
              setIdTop(response.data.data[response.data.data.length - 1]._id);
            } else {
              setMore("Nothing there!");
            }
          } else {
            setMore("Nothing there!");
          }

          setProgress(false);
          setQuestionRefresh(false);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getQuestionStore = async (
  idTop,
  setDataQuestion,
  dataQuestion,
  setIdTop,
  setMore,
  setProgress,
  setQuestionRefresh,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getquestion" +
        "?idTop=" +
        idTop
    )
      .then((response) => {
        if (response.data.auth === false) {
          localStorage.setItem("token", response.data.token);
        } else {
          if (response.data) {
            ///  console.log(response.data);
            if (response.data.data !== "no result") {
              if (idTop === "0") {
                setDataQuestion(response.data.data);
              } else {
                for (let i = 0; i < response.data.data.length; i++) {
                  dataQuestion.push({
                    username: response.data.data[i].username,
                    code: response.data.data[i].code,
                    _id: response.data.data[i]._id,
                    title: response.data.data[i].title,
                    description: response.data.data[i].description,
                    tag: response.data.data[i].tag,
                    createdAt: response.data.data[i].createdAt,
                  });
                }
              }
              if (response.data.data.length > 0) {
                setIdTop(response.data.data[response.data.data.length - 1]._id);
              } else {
                setMore("Nothing there!");
              }
            } else {
              setMore("Nothing there!");
            }
            setProgress(false);
            setQuestionRefresh(false);
          }
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//***************************************************************************************************************************************/
export const RemoveQuestion = async (
  _id,
  setIdTop,
  setRefresh,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/removequestion" +
        "?idd=" +
        _id
    )
      .then((response) => {
        if (response.data) {
          setIdTop("0");
          setRefresh(true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getQuestionid = async (
  revID,
  setDataId,
  setDataU,
  reMap,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getquestionid" +
        "?id=" +
        revID
    )
      .then((response) => {
        if (response.data) {
          if (response.data.data === "no result") {
            reMap();
          } else {
            // console.log(response.data.data);
            setDataId([response.data.data]);
            setDataU({ username: response.data.data.username });
          }
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getQuestionComm = async (
  revID,
  setPay,
  setPayload,
  setUsername,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getcomment" +
        "?id=" +
        "question -" +
        revID
    )
      .then((response) => {
        //console.log(response);
        if (response.data) {
          setPay(response.data.data);
        }
        setUsername(response.data.user[0].useremail);
        setPayload({
          dataId: "15",
          dataKind: "question -" + revID,
          username: response.data.user[0].useremail,
          date: moment(moment.now()).format("DD-MM-YYYY hh:mm:ss"),
          text: "",
          code: "",
        });
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const handleIncludeApp = async (
  payload,
  setStep,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertapp",
      payload
    )
      .then((response) => {
        setStep("finish");
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const handleIncludeApi = async (
  payload,
  setStep,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertapi",
      payload
    )
      .then((response) => {
        setStep("finish");
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getApi = async (id, setRowT, setLoadingS, setAuthData) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + ApiServerPort + "/" + id)
      .then((response) => {
        if (response.data) {
          setRowT(JSON.parse(JSON.stringify(response.data.data)));
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getAppPage = async (setPay, getApi, setLoadingS, setAuthData) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getapp")
      .then((response) => {
        if (response.data) {
          setPay(response.data.data);
          getApi();
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};

//************************************************************************************************************************************** */
export const getApiPage = async (
  setPayApi,
  setProgress,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getapi")
      .then((response) => {
        if (response.data) {
          setPayApi(response.data.data);
          setProgress(false);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getCodeblocks = async (
  username,
  setPayloadcode,
  projectnames,
  keysbyindex,
  setKeysindex,
  setProgress,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getcode" +
        "?username=" +
        username
    )
      .then((response) => {
        if (response.data) {
          setPayloadcode(response.data.data);
          response.data.data.forEach(function (item) {
            var projectname = (projectnames[item.projectname] =
              projectnames[item.projectname] || {});
            projectname[item.filename] = true;
          });

          keysbyindex = Object.keys(projectnames);
          setKeysindex(keysbyindex);
        }
        setProgress(false);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};

//************************************************************************************************************************************** */
export const removeCode = async (
  idd,
  getCodeblocks,
  changeDemo,
  setComStat,
  setPay,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" + AddressUrl + ":" + BackendPort + "/removecode" + "?idd=" + idd
    )
      .then((response) => {
        if (response.data) {
          getCodeblocks();
          changeDemo("delete successfully");
          setComStat(true);
          setPay([]);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getCommCode = async (
  id1,
  setPay,
  setPayload,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" + AddressUrl + ":" + BackendPort + "/getcomment" + "?id=" + id1
    )
      .then((response) => {
        if (response.data) {
          setPay(response.data.data);

          setPayload({
            dataId: "15",
            dataKind: id1,
            username: response.data.user[0].useremail,
            date: moment(moment.now()).format("DD-MM-YYYY hh:mm:ss"),
            // date: "1369/12/4",
            text: "",
          });
          // console.log(moment(moment.now()).format("DD-MM-YYYY hh:mm:ss"));
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getDocCodeblocks = async (
  username,
  setPayloadcode,
  setElRefs,
  projectnames,
  keysbyindex,
  setKeysindex,
  setProgress,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getcode" +
        "?username=" +
        username
    )
      .then((response) => {
        if (response.data) {
          setPayloadcode(response.data.data);

          setElRefs((elRefs) =>
            Array(response.data.data.length)
              .fill()
              .map((_, i) => elRefs[i] || createRef())
          );

          response.data.data.forEach(function (item) {
            var projectname = (projectnames[item.projectname] =
              projectnames[item.projectname] || {});
            projectname[item.filename] = true;
          });

          keysbyindex = Object.keys(projectnames);
          setKeysindex(keysbyindex);
        }
        setProgress(false);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const handleIncludeCode = async (
  payload,
  setLoadingS,
  setAuthData,
  setPayload,
  userInfo,
  reMap
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertcodeblock",
      payload
    )
      .then((response) => {})
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
    setPayload({
      code: "",
      filename: "",
      projectname: "",
      username: userInfo,
      description: "",
    });
    reMap();
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getChatRoomPage = (
  room,
  firstUser,
  secondUser,
  setPay,
  setProgress,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.post("http://" + AddressUrl + ":" + BackendPort + "/chatroom", {
      room: room,
      firstuser: firstUser,
      seconduser: secondUser,
    })
      .then((response) => {
        setPay(response.data.result);
        setProgress(false);
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};

//************************************************************************************************************************************** */
export const getChat = async (
  room,
  numberMessage,
  setPay,
  setCheck,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getchat?id=" +
        room +
        "---" +
        numberMessage
    )
      .then((response) => {
        if (response.data) {
          setPay(response.data.data);
          setCheck(true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const handleIncludeChat = async (payload, setLoadingS, setAuthData) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertchat",
      payload
    )
      .then((response) => {})
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getProjectPublic = (
  idTop,
  setDataProject,
  dataProject,
  setMore,
  setIdTop,
  setProgress,
  setRefreshProject
) => {
  try {
    Axios.defaults.withCredentials = true;
    // Axios.defaults.headers.common = {
    //   Authorization: `bearer ${localStorage.getItem("token")}`,
    // };
    Axios.get(
      "http://" + AddressUrl + ":" + BackendPort + "/getprojectpublic",
      {
        params: {
          id: idTop,
        },
      }
    )
      .then((response) => {
        ///setDataReview(...dataReview, response.data.result);
        if (response.data.result !== "no result") {
          if (idTop === 9999999999999) {
            setDataProject(response.data.result);
          } else {
            for (let i = 0; i < response.data.result.length; i++) {
              dataProject.push({
                username: response.data.result[i].username,
                recruitment: response.data.result[i].recruitment,
                projectname: response.data.result[i].projectname,
                deadlinedate: response.data.result[i].deadlinedate,
                minbudget: response.data.result[i].minbudget,
                id: response.data.result[i].id,
                maxbudget: response.data.result[i].maxbudget,
                description: response.data.result[i].description,
                category: response.data.result[i].category,
                explainmore: response.data.result[i].explainmore,
              });
            }
          }
        } else {
          setMore("Nothing there!");
        }
        setIdTop(response.data.result[response.data.result.length - 1].id);
        setProgress(false);
        setRefreshProject(false);
      })
      .catch((error) => {
        //logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getProjIdPublic = (
  reMap,
  exi,
  revID,
  setDataId,

  setBitId
) => {
  try {
    Axios.defaults.withCredentials = true;
    // Axios.defaults.headers.common = {
    //   Authorization: `bearer ${localStorage.getItem("token")}`,
    // };
    Axios.get(
      "http://" + AddressUrl + ":" + BackendPort + "/getidprojectpublic",
      {
        params: {
          id: revID,
        },
      }
    )
      .then((response) => {
        setDataId(response.data.result);
        // console.log(response.data.result);
        // setDataU({ username: response.data.result[0].username });
        // setBitId({
        //   id: revID,
        //   username: response.data.result[0].username,
        //   projectname: response.data.result[0].projectname,
        // });

        if (response.data.result === "no result") {
          // history.push({
          //   pathname: "/dashboard/allproject",
          //   // state: { dataR: dataR },
          // });
          reMap();
        }
      })
      .catch((error) => {
        // logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {
    // console.log("response.data");
  }
};
//************************************************************************************************************************************** */
export const getReviewPublic = (
  idTop,
  setDataReview,
  dataReview,
  setMore,
  setIdTop,
  setProgress,
  setReviewRefresh
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getreviewpublic", {
      params: {
        id: idTop,
      },
    }).then((response) => {
      if (response.data.result !== "no result") {
        if (idTop === 9999999999999) {
          setDataReview(response.data.result);
        } else {
          for (let i = 0; i < response.data.result.length; i++) {
            dataReview.push({
              username: response.data.result[i].username,
              subject: response.data.result[i].subject,
              review: response.data.result[i].review,
              publication: response.data.result[i].publication,
              link: response.data.result[i].link,
              id: response.data.result[i].id,
              file: response.data.result[i].file,
              date: response.data.result[i].date,
              category: response.data.result[i].category,
            });
          }
        }
      } else {
        setMore("Nothing there!");
      }
      setIdTop(response.data.result[response.data.result.length - 1].id);
      setProgress(false);
      setReviewRefresh(false);
    });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getRevIdPublic = (revID, setDataId, setDataU, reMap) => {
  try {
    Axios.defaults.withCredentials = true;

    Axios.get(
      "http://" + AddressUrl + ":" + BackendPort + "/getidreviewpublic",
      {
        params: {
          id: revID,
        },
      }
    ).then((response) => {
      setDataId(response.data.result);
      // console.log(response.data.result);
      setDataU({ username: response.data.result[0].username });
      // console.log(response.data.result);
      if (response.data.result === "no result") {
        reMap();
      }
    });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getQuestionStorePublic = async (
  idTop,
  setDataQuestion,
  dataQuestion,
  setIdTop,
  setMore,
  setProgress,
  setQuestionRefresh
) => {
  try {
    Axios.defaults.withCredentials = true;

    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getquestionpublic" +
        "?idTop=" +
        idTop
    ).then((response) => {
      if (response.data) {
        ///  console.log(response.data);
        if (response.data.data !== "no result") {
          if (idTop === "0") {
            setDataQuestion(response.data.data);
          } else {
            for (let i = 0; i < response.data.data.length; i++) {
              dataQuestion.push({
                username: response.data.data[i].username,
                code: response.data.data[i].code,
                _id: response.data.data[i]._id,
                title: response.data.data[i].title,
                description: response.data.data[i].description,
                tag: response.data.data[i].tag,
                createdAt: response.data.data[i].createdAt,
              });
            }
          }
          if (response.data.data.length > 0) {
            setIdTop(response.data.data[response.data.data.length - 1]._id);
          } else {
            setMore("Nothing there!");
          }
        } else {
          setMore("Nothing there!");
        }
        setProgress(false);
        setQuestionRefresh(false);
      }
    });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getQuestionidPublic = async (
  revID,
  setDataId,
  setDataU,
  reMap
) => {
  try {
    Axios.defaults.withCredentials = true;

    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getquestionidpublic" +
        "?id=" +
        revID
    )
      .then((response) => {
        if (response.data) {
          if (response.data.data === "no result") {
            reMap();
          } else {
            setDataId(response.data.data);
            setDataU({ username: response.data.data.username });
          }
        }
      })
      .catch((error) => {});
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getQuestionCommPublic = async (revID, setPay) => {
  try {
    Axios.defaults.withCredentials = true;

    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getcommentpublic" +
        "?id=" +
        "question -" +
        revID
    )
      .then((response) => {
        //console.log(response);
        if (response.data) {
          setPay(response.data.data);
        }
      })
      .catch((error) => {});
  } catch (error) {}
};
//*************************************************************************************************************************************** */
export const postverify = async (
  phone,
  tokenValue,
  setCaptchaSat,
  setTokenValue,
  setOtpShow
) => {
  try {
    Axios.post("http://" + AddressUrl + ":" + BackendPort + "/postverify", {
      phone: phone,
      tokenValue: tokenValue,
    }).then((response) => {
      if (response)
        if (response.data)
          if (response.data === "Failed") {
            setCaptchaSat(true);
            setTokenValue("");
            setOtpShow(false);
          }
      // console.log(response);
    });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const postcode = async (
  phone,
  code,
  setAuthData,
  setUserInfo,
  setUserInfo2,
  remap,
  setRgSt,
  setOpen,
  tokenVal,
  setCaptchaOtpStat
) => {
  try {
    Axios.defaults.withCredentials = true;
    // console.log("otp3:  " + code);
    Axios.post("http://" + AddressUrl + ":" + BackendPort + "/postcode", {
      phone: phone,
      code: code,
      tokenVal: tokenVal,
    }).then((response) => {
      // console.log(response);

      if (!response.data.auth) {
        if (response.data === "fill") {
          setRgSt(false);
        } else {
          // console.log("wrong code!");
        }
      } else {
        // console.log("here");

        localStorage.setItem("token", response.data.token);
        //setLoginStatus(true);
        setAuthData(true);
        setUserInfo(response.data.result.useremail);
        setUserInfo2(response.data.result.useremail);
        setOpen(false);
        remap();
      }
      setCaptchaOtpStat(false);
    });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const verifyregister = async (
  usernameReg,
  userfamilyReg,
  emailReg,
  passwordReg,
  phone,
  setAuthData,
  setUserInfo,
  setUserInfo2,
  setSOpen,
  setOpen,
  setRgSt,
  setMainVerify,
  remap,
  setSubmitted,
  tokenVal,
  setCaptchaOtpStat
) => {
  try {
    Axios.defaults.withCredentials = true;

    Axios.post("http://" + AddressUrl + ":" + BackendPort + "/verifyregister", {
      username: usernameReg,
      userlastname: userfamilyReg,
      email: emailReg,
      password: passwordReg,
      phone: phone,
      tokenVal: tokenVal,
    }).then((response) => {
      // console.log(response);

      if (!response.data.auth) {
        setSOpen(true);
        setSubmitted(false);
        // console.log("fail");
      } else {
        // console.log("here");
        setOpen(false);
        setRgSt(true);
        setMainVerify(false);
        localStorage.setItem("token", response.data.token);
        //setLoginStatus(true);
        setAuthData(true);
        setUserInfo(response.data.result.useremail);
        setUserInfo2(response.data.result.useremail);
        remap();
      }
      setCaptchaOtpStat(false);
    });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const searchProjectPostG = (
  id,
  setSearchProjectValue,
  setOpenS,
  prevOpenS
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/searchprojectg", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        if (response.data.result !== "no result") {
          setSearchProjectValue(response.data.result);

          setOpenS((prevOpenS) => true);
        } else {
          setSearchProjectValue([
            {
              id: 0,
              projectname: "sorry!",
            },
          ]);
          setOpenS((prevOpenS) => true);
        }
      })
      .catch((error) => {
        // logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const searchIdeaPostG = (
  id,
  setSearchIdeaValue,
  setOpenS,
  prevOpenS
) => {
  try {
    Axios.defaults.withCredentials = true;
    // Axios.defaults.headers.common = {
    //   Authorization: `bearer ${localStorage.getItem("token")}`,
    // };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/searchideag", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        if (response.data.result !== "no result") {
          setSearchIdeaValue(response.data.result);

          setOpenS((prevOpenS) => true);
        } else {
          setSearchIdeaValue([
            {
              id: 0,
              subject: "sorry!",
            },
          ]);
          setOpenS((prevOpenS) => true);
        }
      })
      .catch((error) => {
        // logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */

export const searchQuestionPostG = (
  id,
  setSearchQuestionValue,
  setOpenS,
  prevOpenS
) => {
  try {
    Axios.defaults.withCredentials = true;
    // Axios.defaults.headers.common = {
    //   Authorization: `bearer ${localStorage.getItem("token")}`,
    // };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/searchquestiong", {
      params: {
        id: id,
      },
    })
      .then((response) => {
        if (response.data.data !== "no result") {
          setSearchQuestionValue(response.data.data);

          setOpenS((prevOpenS) => true);
        } else {
          setSearchQuestionValue([
            {
              id: 0,
              title: "sorry!",
            },
          ]);
          setOpenS((prevOpenS) => true);
        }
      })
      .catch((error) => {
        // logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getIdeaCommPublic = async (revID, setPay) => {
  try {
    Axios.defaults.withCredentials = true;

    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getcommentpublic" +
        "?id=" +
        "review -" +
        revID
    )
      .then((response) => {
        //console.log(response);
        if (response.data) {
          setPay(response.data.data);
        }
      })
      .catch((error) => {});
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getProjectCommPublic = async (revID, setPay) => {
  try {
    Axios.defaults.withCredentials = true;

    Axios.get(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/getcommentpublic" +
        "?id=" +
        "project -" +
        revID
    )
      .then((response) => {
        //console.log(response);
        if (response.data) {
          setPay(response.data.data);
        }
      })
      .catch((error) => {});
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const getCoinList = async (setCoinListName, setProgress) => {
  try {
    await fetch("https://api.coingecko.com/api/v3/coins/list").then(
      (response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((res) => {
            setCoinListName(res.data);
            setProgress(false);
            // console.log(res.data);
          })
    );
  } catch (error) {}
};
//************************************************************************************************************************************** */
//************************************************************************************************************************************* */

export const getdoclogin = (setPayload, setLoadingS, setAuthData) => {
  // console.log("here11");
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setPayload({
            _id: uuidV4(),
            title: "",
            text: "",
            username: response.data.user[0].useremail,
            access: response.data.user[0].useremail,
            data: null,
          });
        } else {
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const handleIncludeDoc = async (
  payload,
  setResetP,
  setOpen,
  setLoadingS,
  setAuthData
) => {
  // console.log(payload);
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + BackendPort + "/insertdocument",
      payload
    )
      .then((response) => {})
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
    setResetP(true);
    setOpen(false);
  } catch (error) {}
};
//************************************************************************************************************************************* */
//************************************************************************************************************************************* */
export const getdocument = async (
  setPay,
  setProgress,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/getdocument")
      .then((response) => {
        if (response.data) {
          setPay(response.data.data);
          setProgress(false);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const removedocument = async (
  data,
  setResetP,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" +
        AddressUrl +
        ":" +
        BackendPort +
        "/removedocument" +
        "?idd=" +
        data._id
    )
      .then((response) => {
        // if (response.data) {
        setResetP(true);
        // }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
//************************************************************************************************************************************** */
export const compileCode = async (
  mystate,
  setLoading,
  setResult,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };

    Axios.post(
      "http://" + AddressUrl + ":" + CompilerPort + "/api/v1/submit",
      mystate
    )
      .then((res) => {
        setLoading(false);
        const data = res.data;
        if (data.err) {
          // Error in user code
          setResult(data.error);
        } else {
          setResult(data.output);
        }
      })
      .catch((err) => {
        setLoading(false);
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
export const geturllogin = (setPayload, setLoadingS, setAuthData) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + BackendPort + "/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setPayload({
            title: "",
            longUrl: "",
            username: response.data.user[0].useremail,
          });
        } else {
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const handleIncludeUrl = async (
  payload,
  setUrlRefresh,
  setOpen,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await Axios.post(
      "http://" + AddressUrl + ":" + UrlShortPort + "/api/url/shorten",
      payload
    )
      .then((response) => {
        setUrlRefresh(true);
        setOpen(false);
        // if(response.data)
        // if(response.data==="bad word detection")
        //  {
        //   console.log(response.data);}
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
    setUrlRefresh(true);
    setOpen(false);
  } catch (error) {}
};
//************************************************************************************************************************************* */
export const getUrl = async (
  setPay,
  setUrlRefresh,
  setProgress,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.get("http://" + AddressUrl + ":" + UrlShortPort + "/api/geturl")
      .then((response) => {
        if (response.data) {
          setPay(response.data.data);
          setProgress(false);
          setUrlRefresh(false);
        }
      })
      .catch((error) => {
        // logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************* */
// export const removeUrl = async (data, setRefresh, setLoadingS, setAuthData) => {
//   try {
//     Axios.defaults.withCredentials = true;
//     Axios.defaults.headers.common = {
//       Authorization: `bearer ${localStorage.getItem("token")}`,
//     };
//     Axios.delete("http://"+AddressUrl+":"+UrlShortPort+"/api/removeurl" + "?idd=" + data._id)
//       .then((response) => {
//         if (response.data) {
//           setRefresh(true);
//         }
//       })
//       .catch((error) => {
//         logoutAuth(setLoadingS, setAuthData);
//       });
//   } catch (error) {}
// };
//************************************************************************************************************************************** */
export const removeFileUrl = async (
  _id,
  setRefresh,
  setLoadingS,
  setAuthData
) => {
  try {
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    Axios.delete(
      "http://" +
        AddressUrl +
        ":" +
        UrlShortPort +
        "/api/removeurl" +
        "?idd=" +
        _id
    )
      .then((response) => {
        if (response.data) {
          setRefresh(true);
        }
      })
      .catch((error) => {
        logoutAuth(setLoadingS, setAuthData);
      });
  } catch (error) {}
};
//************************************************************************************************************************************** */
//************************************************************************************************************************************** */
