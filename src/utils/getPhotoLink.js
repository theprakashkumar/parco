import axios from "axios";

const getPhotoLink = async (preset, cloudName, cloudUrl, photo) => {
  try {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", preset);
    data.append("cloud_name", cloudName);

    const axiosInstance = axios.create();
    delete axiosInstance.defaults.baseURL;
    delete axiosInstance.defaults.headers.common["authorization"];
    const response = await axiosInstance.post(cloudUrl, data);
    if (response) {
      return response.data.url;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getPhotoLink;
