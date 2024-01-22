// Функция для определения правильного окончания для русских слов

function getRussianEnding(
  number: number,
  singular: string,
  dual: string,
  plural: string
): string {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return singular;
  } else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
    return dual;
  } else {
    return plural;
  }
}

export default function formatTimeAgo(timestamp: number): string {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} минут${getRussianEnding(minutes, "а", "ы", "")} назад`;
  } else if (hours < 24) {
    return `${hours} час${getRussianEnding(hours, "", "а", "ов")} назад`;
  } else {
    return `${days} ден${getRussianEnding(days, "ь", "я", "ей")} назад`;
  }
}
