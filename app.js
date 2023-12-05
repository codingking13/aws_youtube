const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./server/config/db');

app.get('/', (req, res) => {
  let htmlResponse = '<h1>Trend Youtube Tags</h1><hr>'; 

  db.query("SELECT * FROM topwords", (err, data) => {
    if (!err) {
      data.forEach((row, index) => {
        const Count = row.Count;
        const Word = row.Word;
        const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(Word)}`;
        htmlResponse += `${index + 1}. Word Count - ${Count}\n<a href="/sub?word=${encodeURIComponent(Word)}" class="word-link">${Word}</a><br>`;
      });

      res.send(htmlResponse);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

app.get('/sub', (req, res) => {
  const word = req.query.word;
        let responseString ='<h1>Trend Youtube Tags</h1><hr>';

  db.query("SELECT * FROM main WHERE tags LIKE ?", [`%${word}%`], (err, data) => {
    if (!err) {
            data.forEach((row, index) => {
                                  const videoId = row.video_id;
                            const title = row.title;
                            const channelTitle = row.channel_title;
                            const tags = row.tags;
                            const views = row.views;
                            const likes = row.likes;
                            const dislikes = row.dislikes;
                            const commentCount = row.comment_count;
                            const thumbnailLink = row.thumbnail_link;

                            responseString += `${index + 1}. `;
                            responseString += `Title: ${title}\n`;
                            responseString += `   Channel Title: ${channelTitle}\n`;
                            responseString += `   Tags: ${tags}\n`;
                            responseString += `   Views: ${views}`;
                            responseString += `   Likes: ${likes}`;
                            responseString += `   Dislikes: ${dislikes}`;
                            responseString += `   Comment Count: ${commentCount}\n\n     Click Image!!!\n`;
                    responseString += `   <a href="https://www.youtube.com/watch?v=${videoId}" target=_blank"><img src="${thumbnailLink}" alt="Thumbnail"></a>\n\n<hr>\n`           });

      res.send(`<pre>${responseString}</pre>`);
    } else {
      console.log(err);
      res.send(err);