export function formatSongDuration(durationInSeconds: number): string {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    const hoursStr = hours > 0 ? `${hours}:` : '';
    const minutesStr = `${minutes < 10 && hours > 0 ? '0' : ''}${minutes}:`;
    const secondsStr = `${seconds < 10 ? '0' : ''}${seconds}`;

    return `${hoursStr}${minutesStr}${secondsStr}`;
}