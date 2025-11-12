import { redis } from '../../main.js';


// function rateLimiter (keyPrefix , limit , windowSec) {
//     return  async (req , res , next) => {
//         const userKey = `${keyPrefix}:${req.user?.id || req.ip}`;
//         const value = await redis.get(userKey)

//         try{
//             if(value === null) {
//                 redis.set(userKey , 0);
//                 redis.expire(userKey , windowSec)
//             }
//             if(parseInt(value , 10) > limit) {
//                 return res.status(429).json({
//                     message: "Too many requests"
//                 })
//             }
//             await redis.incr(userKey);
//             next();

//         }catch(error) {
//             return res.status(503).json({
//                 success: false,
//                 message: "Service unavaliable",
//                 error: error.message
//             })
//         }
//     }
// }

            // more better rate-limiter implementation

function rateLimiter(keyPrefix, limit, windowSec) {
  return async (req, res, next) => {
    const userKey = `${keyPrefix}:${req.user?.id || req.ip}`; // user id (isAuth) || IP
    console.log("User id | IP = ",userKey)
    try {
      const wasSet = await redis.set(userKey, 1, 'EX', windowSec, 'NX');
      console.log("Set requests value = ", wasSet)
      if (!wasSet) {
        const count = parseInt(await redis.get(userKey), 10);
        console.log("Total requests send = ", count)
        if (count >= limit) {
          const ttl = await redis.ttl(userKey);
          console.log("Time to live = ", ttl)
          res.set('Retry-After', ttl);
          return res.status(429).json({ message: "Too many requests" });
        }

        await redis.incr(userKey);
      }

      next();
    } catch (err) {
      console.error("Rate limiter error:", err);
      return res.status(503).json({ message: "Service unavailable" });
    }
  };
}

export default rateLimiter