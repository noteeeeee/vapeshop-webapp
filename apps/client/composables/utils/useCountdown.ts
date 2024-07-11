export const useCountdown = (targetTime) => {
  const countdown = ref('00:00:00');
  const dayjs = useDayjs()
  let intervalId = null;

  const updateCountdown = () => {
    const now = dayjs();
    const futureTime = dayjs(targetTime.value);

    const duration = dayjs.duration(futureTime.diff(now));
    const hours = String(duration.hours()).padStart(2, '0');
    const minutes = String(duration.minutes()).padStart(2, '0');
    const seconds = String(duration.seconds()).padStart(2, '0');

    countdown.value = `${hours}:${minutes}:${seconds}`;
  };

  onMounted(() => {
    updateCountdown(); // Initial update
    intervalId = setInterval(updateCountdown, 1000); // Update every second
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return { countdown };
};