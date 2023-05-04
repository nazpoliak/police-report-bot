const mysql = require('mysql');
const TelegramBot = require('node-telegram-bot-api');
const token = '5729950567:AAHTNJPjNapG2LzPSQuroe7rDG0e19pjuzo';

const bot = new TelegramBot(token, {polling: true});
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
});



bot.on("message", msg => {
    const message = msg.text;
    const chatId = msg.chat.id;

    if(message === "/start") {
        bot.sendMessage(chatId, "Вітаємо Вас!👮".bold(), { parse_mode: 'HTML' });
        bot.sendMessage(chatId, "Якщо ви стали свідком:\n- Порушення правил дорожнього руху🚗\n- Порушення громадського порядку або інші адміністративні порушення🏢\nНаш бот допоможе вам подати повідомлення до поліції!🤖");
        setTimeout(bot.sendMessage(chatId, "Виберіть один із наступних пунктів📋:", {
            "reply_markup": {
                "keyboard": [["Подати звернення📩"],   ["Наші контакти☎", "F.A.Q❓"]]
                }
            }), 2000);
    } 
})


bot.on("message", msg => {
    const chatId = msg.chat.id;
    const message = msg.text;
    if (message === "Подати звернення📩") {
        bot.sendMessage(chatId, "Виберіть тип правопорушення:");
        bot.sendMessage(chatId, "Виберіть один із наступних пунктів📋:", {
            "reply_markup": {
                "keyboard": [["Порушення ПДР🚓"], ["Хуліганство🥊"], ["Шахрайство💰"], ["Виклик поліції на місце🚨"]]
            }
        })
    } else if (message === "Наші контакти☎") {
        bot.sendMessage(chatId, "Контакти:\nЗагальна канцелярія НПУ: +38 (044) 254-78-55\nДля запитів на публічну інформацію: +38 (044) 256-15-89\nФакс: +38 (044) 253-64-04");
    } else if (message === "F.A.Q❓") {
        bot.sendMessage(chatId, "1. Для чого створено цей бот?\nДаний бот створено для спрощення комунікації між громадянами та НПУ, зручності повідомлення про адміністративні та іншого роду порушення, а також оперативного реагування на них.\n\n2. Чи можуть треті особи дізнатися інформацію про мене?\nРозголошення одержаних відомостей про Ваше особисте життя без Вашої згоди не допускається, а на Ваше прохання, зазначене у зверненні, не підлягає розголошенню прізвище, місце проживання та роботи.\n\n3. Навіщо залишати свої контакти?\nЧасто виникає необхідність уточнення інформації, а контакти дадуть можливість більш точно та оперативно опрацювати надані Вами відомості.\n\n4. Як довго розглядається надана мною інформація?\nІнформація досліджується невідкладно, а у випадку підтвердження наданої інформації про порушення, органи ДПС в максимально короткі строки вживають відповідні заходи реагування для припинення протиправної діяльності.")
    }
})


bot.on("message", msg => {
    const chatId = msg.chat.id;
    const message = msg.text;
    if (message === "Порушення ПДР🚓" || message === "Хуліганство🥊" || message === "Шахрайство💰" || message === "Виклик поліції на місце🚨") {
        bot.sendMessage(chatId, `Тип правопорушення: ${message}`)
        bot.sendMessage(chatId, "Конкретизуйте дане правопорушення: ");
    }
})

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    // Перевірка, чи є повідомлення з фото/відео та геолокацією
    if (msg.photo && msg.location && msg.text) {
        const text = msg.text;
        const photo = msg.photo[msg.photo.length - 1];
        const fileId = photo.file_id;
        const caption = msg.caption || '';
        const latitude = msg.location.latitude;
        const longitude = msg.location.longitude;
        const date = new Date(msg.date * 1000).toISOString().slice(0, 19).replace('T', ' ');
  
      // Зберігання інформації в базі даних
      connection.query('INSERT INTO reports (user_id, file_id, caption, latitude, longitude, date, text) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, fileId, caption, latitude, longitude, date, text], (error, results, fields) => {
        if (error) throw error;
        bot.sendMessage(chatId, 'Повідомлення успішно збережено!');
      });
    }
  });
