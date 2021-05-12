import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import NewsCard from "../components/NewsCard";
import newsapi from "../api/News";

const News = ({ navigation }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsFromAPI();
  }, []);

  function getNewsFromAPI() {
    newsapi
      .get("top-headlines?country=us&apiKey=37132391e5674461a95799493da45ca8")
      .then(async function (response) {
        setNews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (!news) {
    return null;
  }

  return (
    <View>
      <FlatList
        data={news.articles}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => {
          return <NewsCard item={item} />;
        }}
      />
    </View>
  );
};

export default News;
