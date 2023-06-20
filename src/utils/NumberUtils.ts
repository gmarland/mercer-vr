export class NumberUtils {
    public static getRoundingInteger(min, max): number {
        const diff = max-min;

        if (diff === 0) {
            return 1;
        }
        else {
            let multiplier = 0;

            while (true) {
                if ((diff >= Math.pow(10, multiplier)) && (diff < Math.pow(10, multiplier+1))) return Math.pow(10, (multiplier));

                multiplier++;
            }
        }
    }
}