import TelegramBot from "node-telegram-bot-api"; // подключаем node-telegram-bot-api
import axios from "axios";
const token = "2042088420:AAGUIPmmCCpNfvyS6t5uIlePn38LIptzFoA"; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new TelegramBot(token, { polling: true });

//конфиг клавиатуры
const keyboard = [
  [
    {
      text: "Хочу песика",
      callback_data: "morePes",
    },
  ],
];

// обработчик события присылания нам любого сообщения
bot.on("message", (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, "Привет, Друг! чего хочешь?", {
    // прикрутим клаву
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

// обработчик событий нажатий на клавиатуру
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "morePes") {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then(function (responce) {
        console.log(responce.data);
        let picture = responce.data;
        bot.sendMessage(chatId, picture.message, {
          reply_markup: {
            inline_keyboard: keyboard,
          },
        });
      });
  }
});
