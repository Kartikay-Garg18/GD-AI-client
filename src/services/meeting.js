import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const randomGenerator = (topics) => {
    const randomIdx = Math.floor(Math.random() * topics.length);
    return topics[randomIdx];
}

const getTopic = async () => {
    try {
        const response = await axios.get(`${API}/langchain/trending?category=general&top_k=5`);
        return randomGenerator(response.data.data.topics);
    } catch (error) {
        throw new Error(error);
    }
}

export {getTopic};