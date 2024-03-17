//* Uncomment the code below to use the NotificationsService

// const firebase = require("firebase-admin");

// /**
//  * @typedef {import("firebase-admin").messaging.Message} Notification
//  * @typedef {NotificationsService} NotificationsService
//  */

// class NotificationsService {
//   constructor() {
//     this.sendNotification = this.sendNotification.bind(this);
//     this.sendMulipleNotifications = this.sendMulipleNotifications.bind(this);
//   }

//   /**
//    *
//    * @param {Notification} notification
//    * @returns {Promise<void>}
//    */
//   async sendNotification(notification) {
//     await firebase.messaging().send(notification);
//   }

//   /**
//    *
//    * @param {Notification[]} notifications
//    * @param {number|undefined} delay
//    * @returns {Promise<void>}
//    */
//   async sendMulipleNotifications(notifications, delay) {
//     let notificationsPromise = [];

//     if (delay) {
//       for (const notification of notifications) {
//         const promise = new Promise((resolve) => {
//           setTimeout(() => {
//             resolve(this.sendNotification(notification));
//           }, delay);
//         });

//         notificationsPromise.push(promise);
//         delay += delay;
//       }
//     } else {
//       notificationsPromise = notifications.map((notification) => {
//         return this.sendNotification(notification);
//       });
//     }

//     const result = await Promise.allSettled(notificationsPromise);

//     console.log(result);
//   }
// }

// module.exports = {
//   notificationsService: new NotificationsService(),
// };
