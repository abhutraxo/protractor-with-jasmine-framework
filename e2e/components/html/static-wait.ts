export class StaticWait {

    static async  waitForSec(s = 0) {
         return await new Promise(r => setTimeout(r, s * 1000 ));
     }

     static async  waitForMinutes(m = 0) {
         return await new Promise(r => setTimeout(r, m * 1000 * 60 ));
     }

     static async  waitForMillSec(ms = 0) {
         return await new Promise(r => setTimeout(r, ms ));
     }
}
