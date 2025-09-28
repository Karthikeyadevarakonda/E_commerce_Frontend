import { useState } from "react";
import axios from "axios";

const useApi = (baseURL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getConfig = (config = {}) => {
    const token = getToken();
    return {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  const fetchData = async (endpoint, config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseURL}${endpoint}`,
        getConfig(config)
      );
      setData(response.data.data);
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const postData = async (endpoint, payload, config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${baseURL}${endpoint}`,
        payload,
        getConfig(config)
      );
      setData(response.data.data);
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const putData = async (endpoint, payload, config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${baseURL}${endpoint}`,
        payload,
        getConfig(config)
      );
      setData(response.data.data);
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (endpoint, config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(
        `${baseURL}${endpoint}`,
        getConfig(config)
      );
      setData(response.data.data);
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
  };
};

export default useApi;
