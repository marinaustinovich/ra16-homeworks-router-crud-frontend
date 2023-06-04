export default function formatTimeAgo(timestamp) {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;

    // Конвертировать время в минуты, часы и дни
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Определить соответствующее сообщение в зависимости от временного промежутка
    if (minutes < 60) {
        return `${minutes} минут${getRussianEnding(minutes, 'а', 'ы', '')} назад`;
    } else if (hours < 24) {
        return `${hours} час${getRussianEnding(hours, '', 'а', 'ов')} назад`;
    } else {
        return `${days} ден${getRussianEnding(days, 'ь', 'я', 'ей')} назад`;
    }
}

  // Функция для определения правильного окончания для русских слов
function getRussianEnding(number, ending1, ending2, ending5) {
    const mod10 = number % 10;
    const mod100 = number % 100;

    if (mod10 === 1 && mod100 !== 11) {
        return ending1;
    } else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
        return ending2;
    } else {
        return ending5;
    }
}
