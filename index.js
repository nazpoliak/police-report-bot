const TelegramBot = require('node-telegram-bot-api');
const token = '5729950567:AAHTNJPjNapG2LzPSQuroe7rDG0e19pjuzo';

const bot = new TelegramBot(token, {polling: true});

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
    } else {
        bot.sendMessage(chatId, "");
    }
})


bot.on("message", msg => {
    const chatId = msg.chat.id;
    const message = msg.text;
    if (message === "Порушення ПДР🚓" || message === "Хуліганство🥊" || message === "Хуліганство🥊" || message === "Виклик поліції на місце🚨") {
        
    }
})