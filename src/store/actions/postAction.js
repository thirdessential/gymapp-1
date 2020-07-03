const rootURL = "https://te-gym-api.herokuapp.com";

export const postActionList = (token) => {
  return async function (dispatch) {
    const data = await fetch(rootURL + "/post/myPosts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const jsondata = await data.json();
    console.log("tycoonRahullllll ::", jsondata);
    dispatch({
      type: "GET_POST",
      payload: jsondata,
    });
  };
};

export const CreatePostAction = (data,token) => {
    
    const { mediaContent , textContent} = data

    let formData = new FormData();
    formData.append('mediaContent', 'mediaContent');
    formData.append('textContent', 'textContent');



    console.log("Goes to Server",data,token )
  return async function (dispatch) {
    const data = await fetch(rootURL + "/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
       
      },
      body:formData
    });

    const jsondata = await data.json();

    console.log("From Sever Side Data", jsondata);

    dispatch({
      type: "CREATE_POST",
      payload: jsondata,
    });
  };
};
