const mongoose = require("mongoose");
const axios = require("axios")


async function getPost() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response;
    } catch (error) {
      console.error(error);
    }
}
module.getPost =  getPost;