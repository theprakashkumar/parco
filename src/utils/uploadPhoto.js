import axios from "axios";

const uploadPhoto = async (photo) => {
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const cloudUrl = process.env.REACT_APP_CLOUD_URL;
    const preset = process.env.REACT_APP_PRESET;

    try {
        const data = new FormData();
        data.append("file", photo);
        data.append("upload_preset", preset);
        data.append("cloud_name", cloudName);

        console.log(preset, cloudName, cloudUrl, photo);

        const axiosInstance = axios.create();
        delete axiosInstance.defaults.baseURL;
        delete axiosInstance.defaults.headers.common["authorization"];
        const response = await axiosInstance.post(cloudUrl, data);
        if (response) {
            console.log(response.data.url);
            return response.data.url;
        }
    } catch (error) {
        console.log(error);
    }
};

export default uploadPhoto;

